import React from 'react';
import styles from './index.module.scss';
import { Dropdown, Avatar, Badge, Button, Menu } from '@arco-design/web-react';
import { IconNotification, IconUser } from '@arco-design/web-react/icon';


const InfoArea = () => {

  const dropList = (
    <Menu>
      <Menu.Item key='3'>写文章</Menu.Item>
      <Menu.Item key='1'>个人主页</Menu.Item>
      <Menu.Item key='2'>创作者中心</Menu.Item>
      <Menu.Item key='4'>注销</Menu.Item>
    </Menu>
  );

  return (
    <div className={styles['info-area']}>
      <div className={styles['btn-area']}>
        <Button type="primary">Create Post</Button>      
      </div>
      <div className={styles['notification-area']}>
        <Badge count={10} style={{ fontSize: '3px' }}>
          <IconNotification style={{ fontSize: '24px' }} />
        </Badge>
      </div>
      <div className={styles['avatar-area']}>
        <Dropdown position="bottom" droplist={dropList}>
          <Avatar size={28} style={{ background: '#3370ff'}}>
            <IconUser />
          </Avatar>
        </Dropdown>
      </div>
    </div>
  );
};

export default InfoArea;