import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.199.131:5000/employee');
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData(); // Refetch data to reset filtering
    setSearchQuery(''); // Clear search query
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.EmployeeID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.PhoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.Position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.Salary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employees List</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search employees"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {filteredEmployees.map((employee) => (
            <View key={employee.EmployeeID} style={styles.employeeContainer}>
              <Text style={styles.employeeText}>Employee ID: {employee.EmployeeID}</Text>
              <Text style={styles.employeeText}>Name: {employee.Name}</Text>
              <Text style={styles.employeeText}>Phone Number: {employee.PhoneNumber}</Text>
              <Text style={styles.employeeText}>Position: {employee.Position}</Text>
              <Text style={styles.employeeText}>Salary: {employee.Salary}</Text>
              <View style={styles.separator}></View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: windowWidth < 600 ? 24 : 32, // Set font size based on screen width
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  employeeContainer: {
    marginBottom: 20,
  },
  employeeText: {
    fontSize: 18,
    marginBottom: 5,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default EmployeesList;
