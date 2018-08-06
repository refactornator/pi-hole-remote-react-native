import { types, flow } from 'mobx-state-tree';
import { AsyncStorage } from 'react-native';

const API_TOKEN_KEY = 'API_TOKEN';
const API_URL = 'http://raspberrypi.local/admin/api.php';

const Store = types
  .model('Store', {
    token: types.maybe(types.string),
    status: types.optional(
      types.enumeration(['enabled', 'disabled', 'unknown']),
      'unknown'
    ),
    statusState: types.optional(
      types.enumeration(['unfetched', 'loading', 'loaded', 'error']),
      'unfetched'
    )
  })
  .actions(self => {
    const afterCreate = flow(function*() {
      try {
        const storedToken = yield AsyncStorage.getItem(API_TOKEN_KEY);
        if (storedToken) {
          self.token = storedToken;
        }
      } catch (error) {
        console.error('Failed to get token', error);
      }
    });

    const updateStatus = flow(function*() {
      self.statusState = 'loading';
      try {
        const response = yield fetch(API_URL);
        const json = yield response.json();
        const { status } = json;
        self.status = status;
        self.statusState = 'loaded';
      } catch (error) {
        console.log('Error connecting to Pi-Hole:', error);
        self.status = 'unknown';
        self.statusState = 'error';
      }
    });

    const toggleBlocking = flow(function*() {
      let url = `${API_URL}?auth=${self.token}`;
      self.statusState = 'loading';
      if (self.status === 'enabled') {
        url += '&disable=0';
        self.status = 'disabled';
      } else if (self.status === 'disabled') {
        url += '&enable';
        self.status = 'enabled';
      }

      try {
        const response = yield fetch(url);
        const json = yield response.json();
        const { status } = json;
        self.status = status;
        self.statusState = 'loaded';
      } catch (error) {
        console.log('Error connecting to Pi-Hole:', error);
        self.token = undefined;
        self.status = 'unknown';
        self.statusState = 'error';
      }
    });

    const setToken = flow(function*(newToken) {
      yield AsyncStorage.setItem(API_TOKEN_KEY, newToken);
      self.token = newToken;
      updateStatus();
    });

    const clearToken = flow(function*() {
      yield AsyncStorage.removeItem(API_TOKEN_KEY);
      self.token = undefined;
    });

    return { afterCreate, updateStatus, toggleBlocking, setToken, clearToken };
  });

export default Store;
