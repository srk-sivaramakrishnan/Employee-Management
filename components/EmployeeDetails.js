// EmployeesList.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import baseURL from '../auth/connection';
import EditEmployee from './EditEmployee'; // Import the new component
import { createPDF, createCSV } from './FileGenerator'; // Import file generation functions

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

  const handleDownloadPDF = async () => {
    try {
      await createPDF(employees);
      Alert.alert('Success', 'PDF has been generated');
    } catch (error) {
      console.error('Error creating PDF:', error);
      Alert.alert('Error', 'Failed to create PDF');
    }
  };

  const handleDownloadCSV = async () => {
    try {
      await createCSV(employees);
      Alert.alert('Success', 'CSV has been generated');
    } catch (error) {
      console.error('Error creating CSV:', error);
      Alert.alert('Error', 'Failed to create CSV');
    }
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
                <Ionicons name="pencil" size={20} color="#E4C59E" />
              </TouchableOpacity>
            </View>
            <Text style={styles.employeeID}>Employee ID: {employee.employee_id}</Text>
            {selectedEmployee === employee && (
              <View style={styles.employeeDetails}>
                <Text style={styles.detail}>Phone Number: {employee.phone}</Text>
                <Text style={styles.detail}>Email: {employee.email}</Text>
                <Text style={styles.detail}>Address: {employee.address}</Text>
                <Text style={styles.detail}>Qualification: {employee.qualification}</Text>
                <Text style={styles.detail}>Position: {employee.position}</Text>
                <Text style={styles.detail}>Salary: {employee.salary}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.downloadButtonsContainer}>
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadPDF}>
          <Text style={styles.downloadButtonText}>Download as PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadCSV}>
          <Text style={styles.downloadButtonText}>Download as CSV</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#E4C59E',
  },
  contentContainer: {
    padding: 20,
  },
  employeeContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#803D3B',
  },
  selectedContainer: {
    backgroundColor: '#803D3B',
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
    color: '#E4C59E',
  },
  employeeID: {
    fontSize: 16,
    marginTop: 5,
    color: '#E4C59E',
  },
  employeeDetails: {
    marginTop: 10,
    color: '#E4C59E',
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#E4C59E',
  },
  editIcon: {
    padding: 5,
  },
  downloadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  downloadButton: {
    backgroundColor: '#803D3B',
    paddingVertical: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EmployeesList;
