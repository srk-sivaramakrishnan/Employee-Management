import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Home from '../components/Home';
import AddEmployee from '../components/AddEmployee';
import RemoveEmployee from '../components/RemoveEmployee';
import EmployeeDetails from '../components/EmployeeDetails';
import SearchEmployees from '../components/Search'; // Corrected import
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Corrected import

const Dashboard = () => {
  const navigation = useNavigation();

  const [selectedAction, setSelectedAction] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHomeContent, setShowHomeContent] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarLinkClick = (action) => {
    setSelectedAction(action);
    setShowHomeContent(action === 'Home');
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    navigation.navigate('Login');
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
        return <SearchEmployees />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#141E46' }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.companyName}>KGISL EMPLOYEE MANAGEMENT</Text>
        {showHomeContent && <Home />}
        {renderComponent()}
      </ScrollView>

      <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>

      <Modal visible={sidebarOpen} transparent={true} animationType="slide">
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarLink} onPress={() => handleSidebarLinkClick('Home')}>
            <Ionicons name="home-outline" size={24} color="#141E46" />
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>

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

          <TouchableOpacity style={styles.sidebarLink} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#141E46" />
            <Text style={styles.linkText}>Logout</Text>
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
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
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
