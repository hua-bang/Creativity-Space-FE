import React from 'react';
import { Menu, Message } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/user';
import { User } from '@/typings/user';

interface DropListProps {
  userInfo?: User;
}

const DropList: React.FC<DropListProps> = ({
  userInfo
}) => {

  const navigate = useNavigate();

  const menuList = [
    { 
      title: '写文章',
      onClick() {
        navigate('/editor');
      }
    },
    {
      title: '个人主页',
      onClick() {
        if (userInfo) {
          navigate(`/author/${userInfo.id}`);
        }
      } 
    },
    {
      title: '创作者中心',
      onClick() {
        Message.info('暂未开放');
      }
    },
    {
      title: '聊天',
      onClick() {
        navigate('/chat');
      }
    },
    {
      title: '个人设置',
      onClick() {
        navigate('/setting');
      }
    },
    {
      title: '注销',
      onClick() {
        logout();
        Message.success('注销成功');
      }
    }
  ];

  return (
    <Menu>
      { menuList.map((item, index) => (
        <Menu.Item onClick={item.onClick} key={`${index}`}>
          {item.title}
        </Menu.Item>
      )) }
    </Menu>
  );
};

export default DropList;