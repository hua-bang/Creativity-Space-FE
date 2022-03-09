import React from 'react';
import { RouteObject } from 'react-router-dom';
import Author from './SubViews/Author';
import Content from './SubViews/Content';
import { 
  AuthorIcon,
  ContactIcon,
  ContentIcon,
  HomeIcon,
  TagIcon
} from '../../assets/images/icon';

export interface Menu extends RouteObject {
  name: string;
  hidden: boolean;
  icon?: string;
}

const menuList: Menu[] = [
  { 
    name: 'Home', 
    path: 'content',
    hidden: false,
    element: <Content />,
    icon: HomeIcon
  },
  {
    name: 'Author',
    path: 'author',
    hidden: false,
    element: <Author />,
    icon: AuthorIcon
  },
  { 
    name: 'Content', 
    path: 'content',
    hidden: false,
    element: <Content />,
    icon: ContentIcon
  },
  {
    name: 'Tag',
    path: 'tag',
    hidden: false,
    element: <Author />,
    icon: TagIcon
  },
  {
    name: 'Contact',
    path: 'tag',
    hidden: false,
    element: <Author />,
    icon: ContactIcon
  },
];

export default menuList;