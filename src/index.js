import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/configstore';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';

// sass
import './assets/scss/main.scss';
// imoport đa ngôn ngữ sử dụng thư viện i18next
import './i18n';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
