import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import UserReducer from './reducers/UserReducer';
import ListMovieReducer from './reducers/ListMovieReducer';
import ShowTimeMovieReducer from './reducers/ShowTimeMovieReducer';
// import MannageBookTicketReducer from './reducers/MannageBookTicketReducer';
// State tổng của ứng dụng
import LoadingReducer from './reducers/LoadingReducer';
const rootReducer = combineReducers({
  ListMovieReducer,
  UserReducer,
  LoadingReducer,
  ShowTimeMovieReducer,
});

// Applu redux thunk để dispatch lên API
export const store = createStore(rootReducer, applyMiddleware(thunk));
