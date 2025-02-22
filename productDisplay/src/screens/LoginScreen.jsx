import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Tender Management Login</Text>
        <LoginForm navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#e0f7fa', // A light blue tone for a fresh look
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    elevation: 8, // Android shadow
    width: '90%',
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
