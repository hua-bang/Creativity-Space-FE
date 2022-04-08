import React, { ReactElement } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import Home from '../views/Home';
import Creator from '../views/Creator';
import Editor from '../views/Editor';
import Search from '../views/Search';
import Login from '@/views/Login';
import Article from '@/views/Article';
import Setting from '@/views/Setting';
import AuthorDetail from '@/views/Author-Detail';
import PointDetail from '@/views/Point-Detail';
import CreateBooklet from '@/views/Create-Booklet';
import BookletDetail from '@/views/Booklet-Detail';
import BookletArticleDetail from '@/views/Booklet-Article-Detail';
import BookletArticleEditor from '@/views/Booklet-Article-Editor';
import Chat from '@/views/Chat';

interface RouterConfig extends RouteObject {
  auth?: string | string[];
  redirectPath?: string;
  noMatch?: ReactElement<any, any>; 
}

const routes: RouterConfig[] = [
  {
    path: '/',
    element: <Navigate to="/home/content" />
  },
  {
    path: '/home/*',
    element: <Home />
  },
  {
    path: '/creator/*',
    element: <Creator />,
    // auth: ['user']
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
    // auth: ['user'],
  },
  {
    path: '/author/:id',
    element: <AuthorDetail />
  },
  {
    path: '/point/:id',
    element: <PointDetail />
  },
  {
    path: '/booklet/create',
    element: <CreateBooklet />
  },
  {
    path: '/booklet/update/:id',
    element: <CreateBooklet />
  },
  {
    path: '/booklet/detail/:id',
    element: <BookletDetail />
  },
  {
    path: '/booklet/:bookletId/article/:articleId',
    element: <BookletArticleDetail />
  },
  {
    path: '/booklet/:bookletId/edit/:articleId',
    element: <BookletArticleEditor />
  },
  {
    path: '/chat',
    element: <Chat />
  }
];

export default routes;