import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const SearchEmployees = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Name'); // Default filter

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/search', {
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
        <Text style={styles.employeeText}>Phone Number: {item.phone}</Text>
        <Text style={styles.employeeText}>Position: {item.position}</Text>
        <Text style={styles.employeeText}>Salary: {item.salary}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
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
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  filterPicker: {
    width: 120,
    height: 40,
  },
  searchButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
  },
  employeeContainer: {
    borderWidth: 1,
    borderColor: 'gray',
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
