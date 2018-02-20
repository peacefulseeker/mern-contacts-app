//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import ContactBox from './ContactBox';
import './App.css';
ReactDOM.render(
  <ContactBox
    urlLocal='http://localhost:3001/api/contacts'
    url='https://ancient-river-68531.herokuapp.com:3001/api/contacts/'
    pollInterval={2000} />,
  document.getElementById('root')
);
