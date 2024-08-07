import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import baseURL from '../auth/connection';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [qualification, setQualification] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');

  const handleAddEmployee = () => {
    const employeeData = {
      name,
      phone,
      email,
      address,
      employeeId,
      qualification,
      position,
      salary,
    };

    axios.post(`${baseURL}/employee`, employeeData)
      .then(response => {
        console.log('Employee added successfully:', response.data);
        Alert.alert('Success', 'Employee added successfully');
        // Clear input fields after adding employee
        clearFields();
      })
      .catch(error => {
        console.error('Error adding employee:', error);
        Alert.alert('Error', 'Failed to add employee. Please try again.');
      });
  };

  const clearFields = () => {
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setEmployeeId('');
    setQualification('');
    setPosition('');
    setSalary('');
  };

  const renderInputWithLabel = (label, value, onChangeText) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Employee</Text>
      {renderInputWithLabel('Name:', name, setName)}
      {renderInputWithLabel('Phone Number:', phone, setPhone)}
      {renderInputWithLabel('Email:', email, setEmail)}
      {renderInputWithLabel('Address:', address, setAddress)}
      {renderInputWithLabel('Employee ID:', employeeId, setEmployeeId)}
      {renderInputWithLabel('Qualification:', qualification, setQualification)}
      {renderInputWithLabel('Position:', position, setPosition)}
      {renderInputWithLabel('Salary:', salary, setSalary)}
      <TouchableOpacity style={styles.button} onPress={handleAddEmployee}>
        <Text style={styles.buttonText}>Add Employee</Text>
      </TouchableOpacity>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#E4C59E', // Changed background color
  },
  inputContainer: {
    width: screenWidth * 0.8,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#803D3B', // Changed text color
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#803D3B', // Changed text color
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#fff', // Changed input box color
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#803D3B', // Changed button color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddEmployee;
