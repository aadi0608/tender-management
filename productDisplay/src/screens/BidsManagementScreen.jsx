// src/screens/BidsManagementScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TenderContext } from '../context/TenderContext';

const BidsManagementScreen = () => {
  const { tenders } = useContext(TenderContext);

  // Aggregate all bids from each tender with related information
  const allBids = tenders.reduce((acc, tender) => {
    return acc.concat(
      tender.bids.map(bid => ({
        ...bid,
        tenderEndTime: tender.endTime,
        bufferTime: tender.bufferTime,
        tenderName: tender.name,
      }))
    );
  }, []);

  // Sort bids in ascending order by cost
  const sortedBids = allBids.sort((a, b) => a.cost - b.cost);

  const isLastFiveMinutes = (bidTime, tenderEndTime) => {
    const bidDate = new Date(bidTime);
    const endDate = new Date(tenderEndTime);
    return (endDate - bidDate) / 60000 <= 5;
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.company}</Text>
      <Text style={styles.cell}>{item.tenderName}</Text>
      <Text style={styles.cell}>{new Date(item.time).toLocaleString()}</Text>
      <Text style={styles.cell}>{item.cost}</Text>
      <Text style={styles.cell}>{isLastFiveMinutes(item.time, item.tenderEndTime) ? '⚠️' : ''}</Text>
    </View>
  );

  // Use ListHeaderComponent to display the header above the list
  const ListHeader = () => (
    <View>
      <Text style={styles.title}>Bids Management</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Company</Text>
        <Text style={styles.headerCell}>Tender</Text>
        <Text style={styles.headerCell}>Time</Text>
        <Text style={styles.headerCell}>Cost</Text>
        <Text style={styles.headerCell}>Flag</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={sortedBids}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={{ paddingBottom: 20 }}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#bdc3c7',
    borderRadius: 8,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  cell: {
    flex: 1,
    color: '#2c3e50',
    textAlign: 'center',
  },
});

export default BidsManagementScreen;
