import React from 'react';
import styles from './index.module.scss';
import { Dropdown, Avatar, Badge, Button, Menu } from '@arco-design/web-react';
import { IconNotification, IconUser } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';

const InfoArea = () => {

  const navigate = useNavigate();

  const { userStore } = useStore();

  const dropList = (
    <Menu>
      <Menu.Item key='3'>写文章</Menu.Item>
      <Menu.Item key='1'>个人主页</Menu.Item>
      <Menu.Item key='2'>创作者中心</Menu.Item>
      <Menu.Item key='4'>注销</Menu.Item>
    </Menu>
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
        <Badge count={10} style={{ fontSize: '3px' }}>
          <IconNotification style={{ fontSize: '24px' }} />
        </Badge>
      </div>
      <div className={styles['avatar-area']}>
        <Dropdown position="bottom" droplist={dropList}>
          <Avatar size={28} style={{ background: '#3370ff'}}>
            { userStore.userInfo?.avatar ?? <IconUser fontSize={20} /> }
          </Avatar>
        </Dropdown>
      </div>
    </div>
  );
};

export default observer(InfoArea);