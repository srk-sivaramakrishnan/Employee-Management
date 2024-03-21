// Dashboard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* Sticky sidebar with links */}
        <View style={styles.sidebarLinks}>
          {/* Add Employee link */}
          <TouchableOpacity style={styles.sidebarLink}>
            <Ionicons name="person-add-outline" size={24} color="black" />
            <Text style={styles.linkText}>Add </Text>
            <Text style={styles.linkText}>Employee</Text>
          </TouchableOpacity>

          {/* Break */}
          <View style={{ height: 20 }}></View>

          {/* Remove Employee link */}
          <TouchableOpacity style={[styles.sidebarLink, { marginBottom: 10 }]}>
            <Ionicons name="trash-outline" size={24} color="black" />
            <Text style={styles.linkText}>Remove </Text>
            <Text style={styles.linkText}>Employee</Text>
          </TouchableOpacity>
          
             {/* Break */}
             <View style={{ height: 30 }}></View>

          <TouchableOpacity style={styles.sidebarLink}>
            <Ionicons name="list-outline" size={24} color="black" />
            <Text style={styles.linkText}>Employee </Text>
            <Text style={styles.linkText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 80,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
  },
  sidebarLinks: {
    marginTop: 30,
    alignItems: 'center',
  },
  sidebarLink: {
    marginBottom: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 12,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
