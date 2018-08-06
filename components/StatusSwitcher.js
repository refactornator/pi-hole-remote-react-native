import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';

export default ({ status, statusState, toggleBlocking }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Blocking Status</Text>
    <View style={styles.switchContainer}>
      <Text>Disabled</Text>
      <Switch
        style={styles.switch}
        value={status === 'enabled'}
        disabled={statusState === 'loading'}
        onValueChange={toggleBlocking}
      />
      <Text>Enabled</Text>
    </View>
    <ActivityIndicator
      hidesWhenStopped={true}
      animating={statusState === 'loading'}
      size="small"
      color="#0000ff"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 26,
    marginBottom: 10
  },
  switchContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10
  },
  switch: {
    marginLeft: 10,
    marginRight: 10
  }
});
