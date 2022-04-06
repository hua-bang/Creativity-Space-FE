import { Booklet } from '@/typings/booklet';
import React, { useState } from 'react';
import styles from './index.module.scss';
import { Menu } from '@arco-design/web-react';
import BookletIntroduce from './components/Booklet-Introduce';
import BookletDirectory from './components/Booklet-Directory';

const MenuItem = Menu.Item;

interface BookletMainProps {
  booklet: Booklet;
}

const menus = {
  introduce: {
    title: '介绍',
    component: BookletIntroduce
  },
  directory: {
    title: '目录',
    component: BookletDirectory
  },
};

type MenuKey = keyof typeof menus;

const BookletMain: React.FC<BookletMainProps> = ({
  booklet
}) => {


  const [selectedKey, setSelectedKey] = useState(['introduce']);

  const handleKeyChange = (key: string) => {
    setSelectedKey([key]);
  };

  const RenderComponent = menus[selectedKey[0] as MenuKey].component;

  return (
    <div className={styles['booklet-main-wrapper']}>
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
        <RenderComponent booklet={booklet} />
      </div>
    </div>
  );
};

export default BookletMain;