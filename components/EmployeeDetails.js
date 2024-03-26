import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.199.131:5000/api/employees');
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Error fetching employees. Please try again.');
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup code here (if needed)
    };
  }, []);

  const handleEmployeePress = (employee) => {
    if (selectedEmployee === employee) {
      setSelectedEmployee(null);
    } else {
      setSelectedEmployee(employee);
    }
  };

  const handleEditEmployee = (employee) => {
    // Navigate to the /api/getid route with the selected employee's ID
    Linking.openURL(`http://192.168.199.131:5000/api/getid?id=${employee.employee_id}`);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {employees.map((employee, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.employeeContainer, selectedEmployee === employee && styles.selectedContainer]}
          onPress={() => handleEmployeePress(employee)}
        >
          <View style={styles.employeeHeader}>
            <Text style={styles.employeeName}>{employee.name}</Text>
            <TouchableOpacity onPress={() => handleEditEmployee(employee)} style={styles.editIcon}>
              <Ionicons name="pencil" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.employeeID}>Employee ID: {employee.employee_id}</Text>
          {selectedEmployee === employee && (
            <View style={styles.employeeDetails}>
              <Text style={styles.detail}>Phone Number: {employee.phone}</Text>
              <Text style={styles.detail}>Position: {employee.position}</Text>
              <Text style={styles.detail}>Salary: {employee.salary}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  employeeContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  selectedContainer: {
    backgroundColor: '#e0e0e0',
  },
  employeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  employeeID: {
    fontSize: 16,
    marginTop: 5,
  },
  employeeDetails: {
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  editIcon: {
    padding: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default EmployeesList;
