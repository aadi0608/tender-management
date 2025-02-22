import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { TenderContext } from '../context/TenderContext';
import BidTable from '../components/BidTable';

const TenderDetailScreen = ({ route }) => {
  const { tender } = route.params;
  const { tenders, updateTender } = useContext(TenderContext);
  // Get the latest tender data from context
  const currentTender = tenders.find(t => t.id === tender.id) || tender;
  const [company, setCompany] = useState('');
  const [bidCost, setBidCost] = useState('');

  const handleBidSubmit = () => {
    if (!company || !bidCost) {
      Alert.alert('Error', 'Please fill in all fields for the bid.');
      return;
    }
    const currentTime = new Date();
    const tenderEndTime = new Date(currentTender.endTime);
    const timeDiff = (tenderEndTime - currentTime) / 60000;
    let updatedTenderData = { ...currentTender };

    if (timeDiff <= 5) {
      Alert.alert('Notice', 'Your bid was placed in the last 5 minutes. The tender end time will be extended.');
      const newEndTime = new Date(tenderEndTime.getTime() + currentTender.bufferTime * 60000);
      updatedTenderData.endTime = newEndTime.toISOString();
    }

    const newBid = {
      company,
      time: currentTime.toISOString(),
      cost: parseFloat(bidCost),
    };

    updatedTenderData.bids = [...updatedTenderData.bids, newBid];
    updateTender(updatedTenderData);
    setCompany('');
    setBidCost('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailCard}>
        <Text style={styles.title}>{currentTender.name}</Text>
        <Text style={styles.description}>{currentTender.description}</Text>
        <Text style={styles.info}>{`Start Time: ${currentTender.startTime}`}</Text>
        <Text style={styles.info}>{`End Time: ${currentTender.endTime}`}</Text>
        <Text style={styles.info}>{`Buffer Time: ${currentTender.bufferTime} minutes`}</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.subtitle}>Submit Your Bid</Text>
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          placeholderTextColor="#7f8c8d"
          value={company}
          onChangeText={setCompany}
        />
        <TextInput
          style={styles.input}
          placeholder="Bid Cost"
          placeholderTextColor="#7f8c8d"
          value={bidCost}
          onChangeText={setBidCost}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleBidSubmit}>
          <Text style={styles.buttonText}>Submit Bid</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Bids for this Tender</Text>
      <BidTable bids={currentTender.bids} tenderEndTime={currentTender.endTime} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  /* ... similar styling as before ... */
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 15,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 5,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
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
    marginTop: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TenderDetailScreen;
