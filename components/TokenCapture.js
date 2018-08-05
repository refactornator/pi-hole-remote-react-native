import React from 'react';
import { StyleSheet, Dimensions, Button, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class TokenCapture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readyToScan: false,
      hasCameraPermission: null
    };

    this._scanQRCode = this._scanQRCode.bind(this);
    this._handleBarCodeRead = this._handleBarCodeRead.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    Permissions.getAsync(Permissions.CAMERA).then(({ status }) => {
      if (status === 'granted' && this.mounted) {
        this.setState({
          hasCameraPermission: true
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  _scanQRCode() {
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) => {
      if (status === 'granted') {
        this.setState({
          readyToScan: true,
          hasCameraPermission: true
        });
      }
    });
  }

  _handleBarCodeRead({ data }) {
    if (data.length === 64) {
      this.props.setToken(data);
    }
  }

  render() {
    const { token } = this.props;
    const { readyToScan } = this.state;

    return (
      <View style={styles.container}>
        {readyToScan ? (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={styles.barCodeScanner}
          />
        ) : (
          <View>
            <Text>No API Token found.</Text>
            <Button title="Scan QR Code" onPress={this._scanQRCode} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  barCodeScanner: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
