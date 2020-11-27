import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './style.css';
import './style.less';

const fancyFunc = () => {
  return [1, 2];
};

const [a, b] = fancyFunc();

ReactDom.render(
  <App/>,
  document.querySelector('#root')
);