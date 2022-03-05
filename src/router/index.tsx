import React from 'react';
import { RouteObject } from 'react-router-dom';
import Demo from '../views/Demo';
import Home from '../views/Home';
import Creator from '../views/Creator';

const routes: RouteObject[] = [
  {
    path: '/home/*',
    element: <Home />
  },
  {
    path: '/demo',
    element: <Demo />
  },
  {
    path: '/creator/*',
    element: <Creator />
  }
];

export default routes;