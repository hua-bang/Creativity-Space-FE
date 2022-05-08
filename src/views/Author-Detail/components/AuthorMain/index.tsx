import React, { useState } from 'react';
import styles from './index.module.scss';
import AuthorBasicInfo from './components/AuthorBasicInfo';
import { User } from '@/typings/user';
import AuthorArticleList from './components/AuthorArticleList';
import AuthorPointList from './components/AuthorPointList';
import { Menu } from '@arco-design/web-react';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import AuthorBookletList from './components/AuthorBookletList';
import AuthorLikeList from './components/AuthorLikeList';
import AuthorFollowList from './components/AuthorFollowList';

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
  booklet: {
    title: '小册',
    component: AuthorBookletList
  },
  like: {
    title: '点赞',
    component: AuthorLikeList,
  },
  follow: {
    title: '收藏',
    component: AuthorFollowList,
  },
};

type MenuKey = keyof typeof menus;

const AuthorMain: React.FC<AuthorMainProps> = ({
  author
}) => {

  const [selectedKey, setSelectedKey] = useState(['article']);
  const RenderComponent = menus[selectedKey[0] as MenuKey].component;
  const { userStore } = useStore();

  const handleKeyChange = (key: string) => {
    setSelectedKey([key]);
  };

  return (
    <div className={styles['author-main']}>
      <AuthorBasicInfo author={author} userInfo={userStore.userInfo} />
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
        <RenderComponent author={author} userInfo={userStore.userInfo} />
      </div>
    </div>
  );
};

export default observer(AuthorMain);