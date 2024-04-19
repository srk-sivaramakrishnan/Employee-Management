import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation(); // Initialize useNavigation hook

  const handleLogin = () => {
    if (!employeeId || !password) {
      setError('Please enter both Employee ID and Password');
      return;
    }

    // Implement your authentication logic here
    if (employeeId === '1234' && password === '1234') {
      // Successful login, navigate to the dashboard page
      navigation.navigate('Dashboard');
    } else {
      // Invalid credentials, display error message
      setError('Invalid employee ID or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Employee ID"
        keyboardType="numeric" // Set keyboard type to numeric
        value={employeeId}
        onChangeText={(text) => {
          setEmployeeId(text);
          setError(''); // Clear error message when typing
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError(''); // Clear error message when typing
        }}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141E46', // Changed background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Changed text color
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#fff', // Changed border color
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor:'white',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff', // Changed button color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
