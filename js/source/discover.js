'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
// import Excel from './components/Excel';

// var headers = localStorage.getItem('headers');
// var data = localStorage.getItem('data');

// if (!headers) {
//   headers = ['Title', 'Year', 'Rating', 'Comments'];
//   data = [['Test', '2015', '3', 'meh']];
// }

ReactDOM.render(
  <div style={{ padding: '20px' }}>
    <h1>Component Discoverer</h1>
    <h2>Logo</h2>
<div style={{display: 'inline-block', background: 'purple'}}>
  <Logo />
</div>
  </div>,
  document.getElementById('pad')
);
