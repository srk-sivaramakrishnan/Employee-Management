import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions } from 'react-native'; // Import Alert
import axios from 'axios';

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

    axios.post('http://192.168.199.131:5000/employee', employeeData)
      .then(response => {
        console.log('Employee added successfully:', response.data);
        // Show popup message
        Alert.alert('Success', 'Employee added successfully');
        // Reset form fields after adding employee
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setEmployeeId('');
        setQualification('');
        setPosition('');
        setSalary('');
      })
      .catch(error => {
        console.error('Error adding employee:', error);
        // Show error message if request fails
        Alert.alert('Error', 'Failed to add employee. Please try again.');
      });
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
    
      {renderInputWithLabel('Name:', name, setName)}
      {renderInputWithLabel('Phone Number:', phone, setPhone)}
      {renderInputWithLabel('Email:', email, setEmail)}
      {renderInputWithLabel('Address:', address, setAddress)}
      {renderInputWithLabel('Employee ID:', employeeId, setEmployeeId)}
      {renderInputWithLabel('Qualification:', qualification, setQualification)}
      {renderInputWithLabel('Position:', position, setPosition)}
      {renderInputWithLabel('Salary:', salary, setSalary)}
      <Button title="Add Employee" onPress={handleAddEmployee} />
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
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: screenWidth * 0.8, // Set input container width to 80% of screen width
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold', // Set fontWeight to bold
    color: '#333',
    textAlign: 'left',
  },
  input: {
    width: '100%', // Set input width to 100%
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#333',
  },
});

export default AddEmployee;
