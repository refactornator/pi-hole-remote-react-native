import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';

import Header from '../components/Header';
import TokenCapture from '../components/TokenCapture';
import StatusSwitcher from '../components/StatusSwitcher';

export default observer(
  ({
    store: { token, status, statusState, setToken, clearToken, toggleBlocking }
  }) => (
    <View style={styles.container}>
      {token ? (
        <View>
          <Header status={status} clearToken={clearToken} />
          <StatusSwitcher
            style={styles.statusSwitcher}
            status={status}
            statusState={statusState}
            toggleBlocking={toggleBlocking}
          />
        </View>
      ) : (
        <TokenCapture setToken={setToken} />
      )}
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-around'
  },
  statusSwitcher: {
    flex: 1
  }
});
