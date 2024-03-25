import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import axios from 'axios';

const RemoveEmployee = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [reason, setReason] = useState('');

  const handleRemoveEmployee = () => {
    // Perform validation if necessary

    // Make a DELETE request to remove the employee with reason
    axios.delete(`http://192.168.199.131:5000/employee/${employeeId}`, { data: { reason } })
      .then(response => {
        console.log('Employee removed successfully:', response.data);
        // Show popup message
        Alert.alert('Success', 'Employee removed successfully');
        // Reset the input fields after removal
        setEmployeeId('');
        setReason('');
      })
      .catch(error => {
        console.error('Error removing employee:', error);
        // Show error message if request fails
        Alert.alert('Error', 'Failed to remove employee. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Remove Employee</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Employee ID"
        value={employeeId}
        onChangeText={setEmployeeId}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Reason"
        value={reason}
        onChangeText={setReason}
      />
      <Button title="Remove Employee" onPress={handleRemoveEmployee} />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

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
  input: {
    width: screenWidth * 0.8, // Set input width to 80% of screen width
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default RemoveEmployee;
