import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { TenderContext } from '../context/TenderContext';

const AdminPanelScreen = ({ navigation }) => {
  const { tenders, addTender } = useContext(TenderContext);
  const [tenderName, setTenderName] = useState('');
  const [tenderDescription, setTenderDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bufferTime, setBufferTime] = useState('');

  const handleAddTender = () => {
    if (!tenderName || !tenderDescription || !startTime || !endTime || !bufferTime) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    const newTender = {
      id: tenders.length + 1,
      name: tenderName,
      description: tenderDescription,
      startTime,
      endTime,
      bufferTime: parseInt(bufferTime),
      bids: [],
    };
    addTender(newTender);
    setTenderName('');
    setTenderDescription('');
    setStartTime('');
    setEndTime('');
    setBufferTime('');
  };

  const renderTender = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>{item.description}</Text>
      <Text style={styles.cardText}>{`Starts: ${item.startTime}`}</Text>
      <Text style={styles.cardText}>{`Ends: ${item.endTime}`}</Text>
    </View>
  );

  // Create a header component for static content (title, form, etc.)
  const ListHeader = () => (
    <View>
      <Text style={styles.title}>Admin Panel</Text>
      <View style={styles.form}>
        <Text style={styles.subtitle}>Create New Tender</Text>
        <TextInput
          style={styles.input}
          placeholder="Tender Name"
          placeholderTextColor="#7f8c8d"
          value={tenderName}
          onChangeText={setTenderName}
        />
        <TextInput
          style={styles.input}
          placeholder="Tender Description"
          placeholderTextColor="#7f8c8d"
          value={tenderDescription}
          onChangeText={setTenderDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Start Time (ISO Format)"
          placeholderTextColor="#7f8c8d"
          value={startTime}
          onChangeText={setStartTime}
        />
        <TextInput
          style={styles.input}
          placeholder="End Time (ISO Format)"
          placeholderTextColor="#7f8c8d"
          value={endTime}
          onChangeText={setEndTime}
        />
        <TextInput
          style={styles.input}
          placeholder="Buffer Time (in minutes)"
          placeholderTextColor="#7f8c8d"
          value={bufferTime}
          onChangeText={setBufferTime}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTender}>
          <Text style={styles.buttonText}>Add Tender</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Previous Tenders</Text>
    </View>
  );

  return (
    <FlatList
      data={tenders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderTender}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={styles.container}
      ListFooterComponent={
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#2ecc71', marginVertical: 20 }]}
          onPress={() => navigation.navigate('BidsManagement')}
        >
          <Text style={styles.buttonText}>View All Bids</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    padding: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 20,
  },
  form: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f7f7f7',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    fontSize: 16,
    color: '#2c3e50',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cardSubtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#7f8c8d',
    marginVertical: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#2c3e50',
  },
});

export default AdminPanelScreen;
