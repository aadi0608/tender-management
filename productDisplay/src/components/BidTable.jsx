// src/components/BidTable.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BidTable = ({ bids, tenderEndTime }) => {
  const sortedBids = [...bids].sort((a, b) => a.cost - b.cost);

  const isLastFiveMinutes = (bidTime) => {
    const bidDate = new Date(bidTime);
    const endDate = new Date(tenderEndTime);
    return (endDate - bidDate) / 60000 <= 5;
  };

  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.header}>Company</Text>
        <Text style={styles.header}>Time</Text>
        <Text style={styles.header}>Cost</Text>
        <Text style={styles.header}>Flag</Text>
      </View>
      {sortedBids.map((bid, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{bid.company}</Text>
          <Text style={styles.cell}>{new Date(bid.time).toLocaleString()}</Text>
          <Text style={styles.cell}>{bid.cost}</Text>
          <Text style={styles.cell}>{isLastFiveMinutes(bid.time) ? '⚠️' : ''}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ecf0f1',
  },
  header: {
    flex: 1,
    fontWeight: 'bold',
    color: '#34495e',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    color: '#2c3e50',
    textAlign: 'center',
  },
});

export default BidTable;
