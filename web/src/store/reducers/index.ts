import { combineReducers } from 'redux';

import apiCall from './apiCall';
import websocket from './websocket';

export default combineReducers({
  apiCall,
  websocket,
});
