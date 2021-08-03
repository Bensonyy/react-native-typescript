import { Alert } from 'react-native';
require('promise/lib/rejection-tracking').enable({
  allRejections: true,
  onUnhandled: function (id, error) {
    Alert(id, error);
  },
});
