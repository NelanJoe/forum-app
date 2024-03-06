import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';

import store from './states/index.js';

import './styles/index.css';
// Supports weights 100-900
import '@fontsource-variable/inter';

const rootElement = document.querySelector('#root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      <Toaster position="top-right" />
    </BrowserRouter>
  </Provider>
);
