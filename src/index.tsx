import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd//dist/antd.css';
import '@arco-design/web-react/dist/css/arco.css';
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/vs.css';
import 'github-markdown-css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
