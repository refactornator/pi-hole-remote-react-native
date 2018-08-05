import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default ({ status, pendingStatusChange }) => {
  let content = 'Cannot find Pi-Hole';
  if (status) {
    content = 'Connected to Pi-Hole';
  }
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Text>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginTop: 40,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  logo: {
    width: 50,
    height: 50
  }
});
