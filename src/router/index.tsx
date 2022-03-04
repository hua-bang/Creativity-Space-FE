import React from 'react';
import { RouteObject } from 'react-router-dom';
import Demo from '../views/Demo';
import Home from '../views/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/demo',
    element: <Demo />
  }
];

export default routes;