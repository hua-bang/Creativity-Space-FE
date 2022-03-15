import React, { useState } from 'react';
import styles from './index.module.scss';
import AuthorBasicInfo from './components/AuthorBasicInfo';
import { User } from '@/typings/user';
import AuthorArticleList from './components/AuthorArticleList';
import AuthorPointList from './components/AuthorPointList';
import { Menu } from '@arco-design/web-react';

const MenuItem = Menu.Item;
interface AuthorMainProps {
  author: User;
}

const menus = {
  article: {
    title: '文章',
    component: AuthorArticleList
  },
  point: {
    title: '动态',
    component: AuthorPointList
  },
};

type MenuKey = keyof typeof menus;

const AuthorMain: React.FC<AuthorMainProps> = ({
  author
}) => {

  const [selectedKey, setSelectedKey] = useState(['article']);
  const RenderComponent = menus[selectedKey[0] as MenuKey].component;

  const handleKeyChange = (key: string) => {
    setSelectedKey([key]);
  };

  return (
    <div className={styles['author-main']}>
      <AuthorBasicInfo author={author} />
      <div className={styles['list-area']}>
        <div className={styles['list-nav']}>
          <Menu  mode='horizontal' onClickMenuItem={handleKeyChange} selectedKeys={selectedKey}>
            {
              Object.keys(menus).map(key => (
                <MenuItem key={key}>{menus[key as MenuKey].title}</MenuItem>
              ))
            }
          </Menu>
        </div>
        <RenderComponent author={author}/>
      </div>
    </div>
  );
};

export default AuthorMain;