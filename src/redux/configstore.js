import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import UserReducer from './reducers/UserReducer';
// State tổng của ứng dụng
const rootReducer = combineReducers({
  UserReducer,
});

// Applu redux thunk để dispatch lên API
export const store = createStore(rootReducer, applyMiddleware(thunk));
