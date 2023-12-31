import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { app } from './firebase.config';

import { PersistGate } from 'redux-persist/integration/react';
import { UserProvider } from './context/userContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <Provider store={store} app={app}>
      <PersistGate loading={'loading'} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
