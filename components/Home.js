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
              - KGiSL is a BFSI centric multiproduct Enterprise Software company focused on Insurance, Capital Markets, & Wealth Management segments.{"\n"}
              - KGiSL by roots believe in being empathetic to customers and offering products and services that deliver incremental business outcome.{"\n"}
              - Harnessing the power of Machine Learning (ML), Artificial Intelligence (AI), Analytics, Data Science and Cloud to empower our clients through our products and deliver Empathy based Outcomes backed by next Generation Customer Experience.{"\n"}
              - Continuously innovating and adapting to the evolving needs of the financial services industry.{"\n"}
              - Providing cutting-edge solutions that streamline processes and enhance efficiency for our clients.{"\n"}
              - Committed to maintaining the highest standards of quality and integrity in everything we do.{"\n"}
              - Cultivating long-term partnerships with our clients based on trust, reliability, and mutual success.
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
    backgroundColor: '#141E46',
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
    color: 'white',
    marginBottom: 10,
  },
  descriptionContent: {
    fontSize: 23,
    color: 'white',
    paddingTop: 10,
  },
});

export default Home;
