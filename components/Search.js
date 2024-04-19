import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import baseURL from '../auth/connection';
import { Picker } from '@react-native-picker/picker'; // Corrected import

const SearchEmployees = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Name'); // Default filter

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/search`, {
        searchText,
        selectedFilter
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  const renderEmployee = ({ item }) => {
    return (
      <View style={styles.employeeContainer}>
        <Text style={styles.employeeText}>Employee ID: {item.employee_id}</Text>
        <Text style={styles.employeeText}>Name: {item.name}</Text>
        <Text style={styles.employeeText}>Email: {item.email}</Text>
        <Text style={styles.employeeText}>Phone Number: {item.phone}</Text>
        <Text style={styles.employeeText}>Address: {item.address}</Text>
        <Text style={styles.employeeText}>Position: {item.position}</Text>
        <Text style={styles.employeeText}>Salary: {item.salary}</Text>
        <Text style={styles.employeeText}>Qualification: {item.qualification}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search employees"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Picker
        style={styles.filterPicker}
        selectedValue={selectedFilter}
        onValueChange={(itemValue) => setSelectedFilter(itemValue)}
      >
        <Picker.Item label="Name" value="Name" />
        <Picker.Item label="Employee ID" value="EmployeeID" />
        <Picker.Item label="Phone Number" value="PhoneNumber" />
        <Picker.Item label="Position" value="Position" />
        <Picker.Item label="Salary" value="Salary" />
      </Picker>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={searchResults}
        renderItem={renderEmployee}
        keyExtractor={(item) => (item.EmployeeID ? item.EmployeeID.toString() : item.name)} // Use a fallback key if EmployeeID is undefined
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  filterPicker: {
    height: 40,
    color: 'white',
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchButtonText: {
    color: 'white',
  },
  employeeContainer: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white', 
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  employeeText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default SearchEmployees;
