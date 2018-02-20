//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import ContactBox from './ContactBox';
import './App.css';

let port = 3100;
let boxProps = { urlLocal: `http://localhost:${port}/api/contacts`, url: `/:${port}/api/contacts/`, pollInterval: 2000 }
ReactDOM.render(
  <ContactBox {...boxProps} />,
  document.getElementById('root')
);
