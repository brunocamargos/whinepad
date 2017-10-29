'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/Button';
import Logo from './components/Logo';
import Suggest from './components/Suggest';


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

    <h2>Suggest</h2>
    <div>
      <Suggest options={['eenie', 'meenie', 'miney', 'mo']} />
    </div>

    <h2>Buttons</h2>
    <div>
      Button wiht onclick: <Button onClick={() => alert('ouch')}>Click me</Button>
    </div>

    <div>
      A link: <Button href="http://reactjs.com">Follow me</Button>
    </div>

    <div>
      Custom class name: <Button className="custom">I do nothing</Button>
    </div>

    <h2>Logo</h2>

    <div style={{ display: 'inline-block', background: 'purple' }}>
      <Logo />
    </div>
  </div>,
  document.getElementById('pad')
);
