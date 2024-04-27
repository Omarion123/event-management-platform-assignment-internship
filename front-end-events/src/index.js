import React from 'react';
import ReactDOM from 'react-dom';
import AppRoute from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'


ReactDOM.render(
  <React.StrictMode>
      <AppRoute />
      <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
