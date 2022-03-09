import React from 'react';
import { Menu } from '@arco-design/web-react';

const DropList = () => {
  return (
    <Menu>
      <Menu.Item key='3'>写文章</Menu.Item>
      <Menu.Item key='1'>个人主页</Menu.Item>
      <Menu.Item key='2'>创作者中心</Menu.Item>
      <Menu.Item key='4'>注销</Menu.Item>
    </Menu>
  );
};

export default DropList;