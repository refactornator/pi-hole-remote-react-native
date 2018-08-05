import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';

import Header from './components/Header';
import TokenCapture from './components/TokenCapture';
import StatusSwitcher from './components/StatusSwitcher';

const API_URL = 'http://raspberrypi.local/admin/api.php';
const API_TOKEN_KEY = 'API_TOKEN';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      status: null,
      pendingStatusChange: false
    };

    this.setToken = this.setToken.bind(this);
    this.toggleBlocking = this.toggleBlocking.bind(this);

    this.checkPiHoleStatus();
  }

  componentDidMount() {
    AsyncStorage.getItem(API_TOKEN_KEY).then(token => {
      this.setState({ token });
    });
  }

  toggleBlocking() {
    let url = `${API_URL}?auth=${this.state.token}`;
    if (this.state.status === 'enabled') {
      url += '&disable=0';
      this.setState({
        status: 'disabled',
        pendingStatusChange: true
      });
    } else if (this.state.status === 'disabled') {
      url += '&enable';
      this.setState({
        status: 'enabled',
        pendingStatusChange: true
      });
    }

    fetch(url)
      .then(response => response.json())
      .then(({ status }) => {
        this.setState({ pendingStatusChange: false, status });
      })
      .catch(error => {
        console.log('Error connecting to Pi-Hole:', error);
        this.setState({
          pendingStatusChange: false,
          status: null,
          token: null
        });
      });
  }

  checkPiHoleStatus() {
    fetch(API_URL)
      .then(response => response.json())
      .then(({ status }) => {
        this.setState({ status });
      })
      .catch(error => {
        console.log('Error connecting to Pi-Hole:', error);
        this.setState({ status: null });
      });
  }

  setToken(newToken) {
    AsyncStorage.setItem(API_TOKEN_KEY, newToken);
    this.setState({ token: newToken });
    this.checkPiHoleStatus();
  }

  render() {
    const { status, token, pendingStatusChange } = this.state;

    return (
      <View style={styles.container}>
        {token ? (
          <View>
            <Header status={status} pendingStatusChange={pendingStatusChange} />
            <StatusSwitcher
              style={styles.statusSwitcher}
              status={status}
              pendingStatusChange={pendingStatusChange}
              toggleBlocking={this.toggleBlocking}
            />
          </View>
        ) : (
          <TokenCapture setToken={this.setToken} />
        )}
      </View>
    );
  }
}

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
