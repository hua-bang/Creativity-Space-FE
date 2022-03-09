import React from 'react';
import { RouteObject } from 'react-router-dom';
import Demo from '../views/Demo';
import Home from '../views/Home';
import Creator from '../views/Creator';
import Editor from '../views/Editor';
import Search from '../views/Search';
import Login from '@/views/Login';

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
  },
  {
    path: '/editor',
    element: <Editor />
  },
  {
    path: '/search',
    element: <Search />
  },
  {
    path: '/login',
    element: <Login />
  }
];

export default routes;