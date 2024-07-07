// Home.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Company information */}
        <View style={styles.companyInfo}>
          {/* Company logo image */}
          <Image
            source={require('../assets/images/kgisl.png')}
            style={styles.companyImage}
          />
          <View style={styles.companyDescription}>
            <Text style={styles.descriptionTitle}>ABOUT US:</Text>
            <Text style={styles.descriptionContent}>
              {'\u2022'} * Add Employee: Easily add new employees to the system, capturing all necessary details including name, contact information, position, and qualifications.{"\n\n"}
              {'\u2022'} * Remove Employee: Remove employee records from the system efficiently and securely.{"\n\n"}
              {'\u2022'} * Search Employee: Quickly search and find employee details using various filters such as name, employee ID, phone number, and position.{"\n\n"}
              {'\u2022'} * Export Employee Details: Export employee details in PDF or CSV format for record-keeping and reporting purposes.{"\n\n"}
              {'\u2022'} * User-Friendly Interface: Our system is designed to be user-friendly and intuitive, making it easy for HR teams to manage employee data effectively.{"\n\n"}
              {'\u2022'} * Secure and Reliable: We prioritize data security and ensure that all employee information is stored securely and is accessible only to authorized personnel.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#E4C59E',
  },
  companyInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  companyImage: {
    width: 350, // Adjust width as needed
    height: 350, // Adjust height as needed
    resizeMode: 'contain',
  },
  companyDescription: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#803D3B',
    marginBottom: 10,
  },
  descriptionContent: {
    fontSize: 23,
    color: '#322C2B',
    paddingTop: 10,
  },
});

export default Home;
