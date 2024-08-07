import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import baseURL from '../auth/connection';

const RemoveEmployee = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [reason, setReason] = useState('');

  const screenHeight = Dimensions.get('window').height;
  const reasonInputHeight = screenHeight * 0.2; // Set the height to 20% of the screen height
  const screenWidth = Dimensions.get('window').width;

  const handleRemoveEmployee = async () => {
    try {
      // Validate inputs
      if (!employeeId.trim()) {
        Alert.alert('Error', 'Employee ID is required');
        return;
      }
      if (!reason.trim()) {
        Alert.alert('Error', 'Reason is required');
        return;
      }

      // Make a DELETE request to remove the employee with reason
      const response = await axios.delete(`${baseURL}/employee/${employeeId}`, { data: { reason } });
      console.log('Employee removed successfully:', response.data);
      // Show popup message
      Alert.alert('Success', 'Employee removed successfully');
      // Reset the input fields after removal
      setEmployeeId('');
      setReason('');
    } catch (error) {
      console.error('Error removing employee:', error);
      // Show error message if request fails
      Alert.alert('Error', 'Failed to remove employee. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Remove Employee</Text>
      <TextInput
        style={[styles.input, { width: screenWidth * 0.8 }]} // Set the width dynamically
        placeholder="Enter Employee ID"
        value={employeeId}
        onChangeText={setEmployeeId}
      />
      <TextInput
        style={[styles.input, { width: screenWidth * 0.8, height: reasonInputHeight }]} // Set the width and height dynamically
        placeholder="Enter Reason"
        value={reason}
        onChangeText={setReason}
        multiline // Allow multiline input
      />
      <TouchableOpacity style={styles.button} onPress={handleRemoveEmployee}>
        <Text style={styles.buttonText}>Remove Employee</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4C59E',
    paddingHorizontal: 20, // Add horizontal padding to the container
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#803D3B',
  },
  input: {
    width: '100%', // Set input width to 100% of parent width
    height: 40, // Default height
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff', // Set input background color
    color: '#333',
  },
  button: {
    width: '50%',
    height: 40,
    backgroundColor: '#803D3B', // Changed button color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RemoveEmployee;
