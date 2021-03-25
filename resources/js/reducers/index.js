import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import CardsReducer from './Cards';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    CardsReducer
  });

export default createRootReducer;
