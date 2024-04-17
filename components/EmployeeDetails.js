import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import baseURL from '../auth/connection';
import EditEmployee from './EditEmployee'; // Import the new component

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/employees`);
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
    setEditEmployee(employee);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = (updatedEmployee) => {
    const updatedEmployees = employees.map((emp) =>
      emp.employee_id === updatedEmployee.employee_id ? updatedEmployee : emp
    );
    setEmployees(updatedEmployees);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Employees list */}
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

      {/* Edit Modal */}
      <EditEmployee
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onEdit={handleSaveEdit}
        employee={editEmployee}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141E46', // Set background color
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
    backgroundColor: '#fff', // Set background color
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
    color: '#333', // Set text color
  },
  employeeID: {
    fontSize: 16,
    marginTop: 5,
    color: '#333', // Set text color
  },
  employeeDetails: {
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', // Set text color
  },
  editIcon: {
    padding: 5,
  },
});

export default EmployeesList;
