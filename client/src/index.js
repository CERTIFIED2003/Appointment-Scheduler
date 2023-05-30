import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);