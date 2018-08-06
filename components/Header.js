import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

export default ({ status, clearToken }) => {
  let content = 'Cannot find Pi-Hole';
  if (status) {
    content = 'Connected to Pi-Hole';
  }
  return (
    <TouchableHighlight onPress={clearToken}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <Text>{content}</Text>
      </View>
    </TouchableHighlight>
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
