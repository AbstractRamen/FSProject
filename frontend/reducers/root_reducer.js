import { combineReducers } from 'redux';

import session from './session_reducer';

const rootReducer = combineReducers(
  session: sessionReducer
);

export default rootReducer;