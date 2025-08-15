import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add global styles
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);