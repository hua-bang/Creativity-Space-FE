import React from 'react';
import { RouteObject } from 'react-router-dom';
import Author from './subViews/Author';
import Content from './subViews/Content';

export interface Menu extends RouteObject {
  name: string;
  hidden: boolean;
  icon?: SVGAElement;
}


const menuList: Menu[] = [
  { 
    name: 'Content', 
    path: 'content',
    hidden: false,
    element: <Content /> 
  },
  {
    name: 'Author',
    path: 'author',
    hidden: false,
    element: <Author />
  },
  { 
    name: 'Content', 
    path: 'content',
    hidden: false,
    element: <Content /> 
  },
  {
    name: 'Author',
    path: 'author',
    hidden: false,
    element: <Author />
  },
];

export default menuList;