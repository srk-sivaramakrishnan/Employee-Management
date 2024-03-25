import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, TextInput, Button } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons
import AddEmployee from './AddEmployee'; // Import the AddEmployee component
import EmployeeDetails from './EmployeeDetails'; // Import the EmployeeDetails component

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('AddEmployee');
  const [showSidebar, setShowSidebar] = useState(false); // State to control sidebar visibility

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const renderMainContent = () => {
    switch (selectedOption) {
      case 'AddEmployee':
        return (
          <AddEmployee />
        );
      case 'RemoveEmployee':
        return <Text>Remove Employee Content</Text>; // Placeholder for now
      case 'EmployeeDetails':
        return <EmployeeDetails />;
      default:
        return null;
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const sidebarWidth = screenWidth * 0.3; // Set sidebar width to 30% of screen width
  const mainContentWidth = screenWidth;

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      {showSidebar && (
        <View style={[styles.sidebar, { width: sidebarWidth }]}>
          {/* Sticky sidebar with links */}
          <View style={styles.sidebarLinks}>
            {/* Add Employee link */}
            <TouchableOpacity
              style={styles.sidebarLink}
              onPress={() => {
                setSelectedOption('AddEmployee');
                toggleSidebar(); // Hide sidebar after selecting an option
              }}
            >
              <Ionicons name="person-add-outline" size={24} color="black" />
              <Text style={styles.linkText}>Add Employee</Text>
            </TouchableOpacity>

            {/* Remove Employee link */}
            <TouchableOpacity
              style={[styles.sidebarLink, { marginBottom: 10 }]}
              onPress={() => {
                setSelectedOption('RemoveEmployee');
                toggleSidebar(); // Hide sidebar after selecting an option
              }}
            >
              <Ionicons name="trash-outline" size={24} color="black" />
              <Text style={styles.linkText}>Remove Employee</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sidebarLink}
              onPress={() => {
                setSelectedOption('EmployeeDetails');
                toggleSidebar(); // Hide sidebar after selecting an option
              }}
            >
              <Ionicons name="list-outline" size={24} color="black" />
              <Text style={styles.linkText}>Employee Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.hamburgerMenu} onPress={toggleSidebar}>
        <MaterialCommunityIcons name="menu" size={24} color="black" />
      </TouchableOpacity>

      {/* Main content */}
      <ScrollView style={[styles.mainContent, { width: mainContentWidth }]}>
        {renderMainContent()}
        {/* Add Employee button */}
        <Button title="Add Employee" onPress={() => setSelectedOption('AddEmployee')} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  hamburgerMenu: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 10,
    zIndex: 2, // Ensure hamburger menu is above sidebar
  },
  mainContent: {
 
    backgroundColor: '#fff',
   paddingTop: 33,
  },
  sidebar: {
    position: 'absolute',
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    zIndex: 3, // Set z-index to 3 for sidebar
  },
  sidebarLinks: {
    marginTop: 10, // Reduce the margin to fit hamburger icon
    alignItems: 'center',
  },
  sidebarLink: {
    marginBottom: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 12,
  },
});

export default Dashboard;
