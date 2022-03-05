import React from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import routes from './router/index';
import './App.css';

function App() {
  const elements = useRoutes(routes);
  return elements;
}

export default App;
