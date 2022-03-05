import React from 'react';
import menuList from '../../../../routes';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

const defaultPath = 'content';

const MenuList = () => {

  const navigate = useNavigate();

  const toMenu = (index: number) => {
    const path =  `${(menuList[index]?.path ?? defaultPath)}`; 
    navigate(path);
  };

  return (
    <div className={styles['menu-list']}>
      {
        menuList.map((menu, index) => {
          return (
            <div
              key={index}
              className={styles['menu-item']}
              onClick={() => { 
                toMenu(index);
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <img src={menu.icon} />
              </span>
              { menu.name }
            </div>
          );
        })
      }
    </div>
  );
};

export default MenuList;