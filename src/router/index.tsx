import React, { ReactElement } from 'react';
import { RouteObject } from 'react-router-dom';
import Demo from '../views/Demo';
import Home from '../views/Home';
import Creator from '../views/Creator';
import Editor from '../views/Editor';
import Search from '../views/Search';
import Login from '@/views/Login';
import Article from '@/views/Article';
import Setting from '@/views/Setting';
import AuthorDetail from '@/views/Author-Detail';

interface RouterConfig extends RouteObject {
  auth?: string | string[];
  redirectPath?: string;
  noMatch?: ReactElement<any, any>; 
}

const routes: RouterConfig[] = [
  {
    path: '/home/*',
    element: <Home />
  },
  {
    path: '/creator/*',
    element: <Creator />,
    auth: ['user']
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
  },
  {
    path: '/article/:id',
    element: <Article />
  },
  {
    path: '/setting',
    element: <Setting />,
    auth: ['user'],
  },
  {
    path: '/author/:id',
    element: <AuthorDetail />
  }
];

export default routes;