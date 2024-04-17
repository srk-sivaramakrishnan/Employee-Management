import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddEmployee from '../components/AddEmployee'; // Assuming correct export
import RemoveEmployee from '../components/RemoveEmployee'; // Assuming correct export
import EmployeeDetails from '../components/EmployeeDetails'; // Assuming correct export
import Search from '../components/Search'; // Assuming correct export
import { MaterialIcons } from '@expo/vector-icons';

const Dashboard = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarLinkClick = (action) => {
    setSelectedAction(action);
    setSidebarOpen(false); // Close the sidebar when a link is clicked
  };

  const renderComponent = () => {
    switch (selectedAction) {
      case 'AddEmployee':
        return <AddEmployee />;
      case 'RemoveEmployee':
        return <RemoveEmployee />;
      case 'EmployeeDetails':
        return <EmployeeDetails />;
      case 'Search':
        return <Search />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#141E46' }]}>
      {/* Main content */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Content based on selected action */}
        {renderComponent()}
      </ScrollView>

      {/* Hamburger menu */}
      <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>

      {/* Sidebar */}
      <Modal visible={sidebarOpen} transparent={true} animationType="slide">
        <View style={styles.sidebar}>
          {/* Close button for sidebar */}
          <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          {/* Sidebar content */}
          <TouchableOpacity style={styles.sidebarLink} onPress={() => handleSidebarLinkClick('AddEmployee')}>
            <Ionicons name="person-add-outline" size={24} color="#141E46" />
            <Text style={styles.linkText}>Add Employee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarLink} onPress={() => handleSidebarLinkClick('RemoveEmployee')}>
            <Ionicons name="trash-outline" size={24} color="#141E46" />
            <Text style={styles.linkText}>Remove Employee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarLink} onPress={() => handleSidebarLinkClick('EmployeeDetails')}>
            <Ionicons name="list-outline" size={24} color="#141E46" />
            <Text style={styles.linkText}>Employee Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarLink} onPress={() => handleSidebarLinkClick('Search')}>
            <Ionicons name="search-outline" size={24} color="#141E46" />
            <Text style={styles.linkText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sidebarLink} onPress={() => handleSidebarLinkClick('Leave')}>
            <MaterialIcons name="mail-outline" size={24} color="#141E46" />
            <Text style={styles.linkText}>Leave</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  sidebar: {
    width: 200,
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  sidebarLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
  },
  linkText: {
    fontSize: 12,
    marginLeft: 10,
    color: '#141E46',
  },
});

export default Dashboard;
