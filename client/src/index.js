import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
import { Provider } from 'react-redux';

import App from './components/App';
//firebase auth signin context
import AuthProvider from './components/AuthContext';

// create the store with function exported from reducers file:
const store = configureStore();


ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>

  , document.getElementById('root'));


