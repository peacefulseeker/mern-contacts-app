//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import ContactBox from './ContactBox';
import './App.css';

// eslint-disable-next-line
let port = 3200;
// eslint-disable-next-line
let portHeroku = 8929;
let boxProps = {
  urlLocal: `http://localhost:${port}/api/contacts`,
  url: `/api/contacts`,
  pollInterval: 2000
};
ReactDOM.render(
  <ContactBox {...boxProps} />,
  document.getElementById('root')
);
