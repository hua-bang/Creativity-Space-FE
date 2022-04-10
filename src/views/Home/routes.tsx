import React from 'react';
import { RouteObject } from 'react-router-dom';
import Author from './SubViews/Author';
import Content from './SubViews/Content';
import Point from './SubViews/Point';
import BookletList from '../Booklet-List';
import ChatList from './SubViews/Chat';
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
    name: 'Booklet', 
    path: 'booklet',
    hidden: false,
    element: <BookletList />,
    icon: ContentIcon
  },
  {
    name: 'Chat',
    path: 'Chat',
    hidden: false,
    element: <ChatList />,
    icon: TagIcon
  },
  {
    name: 'Point',
    path: 'point',
    hidden: false,
    element: <Point />,
    icon: ContactIcon
  },
];

export default menuList;