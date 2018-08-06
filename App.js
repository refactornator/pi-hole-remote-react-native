import React from 'react';

import Main from './pages/Main';
import Store from './models/Store';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.store = Store.create();
    this.store.updateStatus();
  }

  render() {
    return <Main store={this.store} />;
  }
}
