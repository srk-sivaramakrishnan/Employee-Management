import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import baseURL from '../auth/connection';

const LeaveApprovalComponent = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(`${baseURL}/leave/request`);
        setLeaveRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        setLoading(false);
      }
    };

    fetchLeaveRequests();

    // Cleanup function
    return () => {
      // Perform cleanup if needed
    };
  }, []);

  const handleApproveLeave = (requestId) => {
    // Make a POST request to approve the leave request
    axios.post(`http://192.168.199.131:5000/leave/approve/${requestId}`)
      .then(response => {
        console.log('Leave request approved:', response.data);
        // Show popup message
        Alert.alert('Success', 'Leave request approved successfully');
        // Remove the approved leave request from the list
        setLeaveRequests(leaveRequests.filter(request => request.id !== requestId));
      })
      .catch(error => {
        console.error('Error approving leave request:', error);
        // Show error message if request fails
        Alert.alert('Error', 'Failed to approve leave request. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Leave Approval</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={leaveRequests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.requestContainer}>
              <Text style={styles.requestText}>Employee ID: {item.employeeId}</Text>
              <Text style={styles.requestText}>Reason: {item.reason}</Text>
              <Button title="Approve Leave" onPress={() => handleApproveLeave(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  requestContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  requestText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default LeaveApprovalComponent;
