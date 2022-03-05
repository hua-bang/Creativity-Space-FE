import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './subViews/Home';
import Content from './subViews/Content';

const Creator = () => {
  return (
    <div>
      <Routes>
        <Route path='home' element={<Home/>} />
        <Route path='content' element={<Content/>} />
      </Routes>
    </div>
  );
};

export default Creator;