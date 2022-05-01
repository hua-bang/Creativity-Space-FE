import NavGroup from '@/components/Nav-Group';
import { Menu } from '@arco-design/web-react';
import React, { useState } from 'react';
import styles from './index.module.scss';
import CreationOverview from './components/CreationOverview';
import ArticleList from './components/ArticleList';
import BookletList from './components/BookletList';
import PointList from './components/PointList';

const menus = {
  overview: {
    title: '概览',
    component: CreationOverview
  },
  article: {
    title: '文章',
    component: ArticleList 
  },
  point: {
    title: '动态',
    component: PointList
  },
  booklet: {
    title: '小册',
    component: BookletList
  }
};

type MenuKey = keyof typeof menus;

const MenuItem = Menu.Item;

const CreationData = () => {

  const [selectedKey, setSelectedKey] = useState(['article']);

  const handleKeyChange = (key: string) => {
    setSelectedKey([key]);
  };

  [].reduce;

  const RenderComponent = menus[selectedKey[0] as MenuKey].component;

  return (
    <div className={styles['creation-data']}>
      <div className={styles['list-nav']}>
        <Menu  mode='horizontal' onClickMenuItem={handleKeyChange} selectedKeys={selectedKey}>
          {
            Object.keys(menus).map(key => (
              <MenuItem key={key}>{menus[key as MenuKey].title}</MenuItem>
            ))
          }
        </Menu>
      </div>
      <div className={styles['render-component-wrapper']}>
        <RenderComponent />
      </div>
    </div>
  );
};

export default CreationData;
