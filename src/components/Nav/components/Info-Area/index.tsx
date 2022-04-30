import React from 'react';
import styles from './index.module.scss';
import { Dropdown, Avatar, Badge, Button, Menu } from '@arco-design/web-react';
import { IconNotification, IconUser } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import DropList from './DropList';

const InfoArea = () => {

  const navigate = useNavigate();

  const { userStore } = useStore();

  const dropList = (
    <DropList userInfo={userStore.userInfo} />
  );

  const toEdit = () => {
    navigate('/editor');
  };

  return (
    <div className={styles['info-area']}>
      <div className={styles['btn-area']}>
        <Button type="primary" onClick={toEdit}>Create Post</Button>      
      </div>
      <div className={styles['notification-area']}>
        
      </div>
      <div className={styles['avatar-area']}>
        <Dropdown position="bottom" droplist={dropList}>
          <Avatar size={28} style={{ background: '#3370ff'}}>
            { 
              userStore.userInfo?.avatar 
                ? <img alt='avatar' src={userStore.userInfo?.avatar} />
                : <IconUser fontSize={20} /> 
            }
          </Avatar>
        </Dropdown>
      </div>
    </div>
  );
};

export default observer(InfoArea);