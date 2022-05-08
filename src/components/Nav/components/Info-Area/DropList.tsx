import React from 'react';
import { Menu, Message, Modal } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/user';
import { User, UserStatus } from '@/typings/user';

interface DropListProps {
  userInfo?: User;
}

const DropList: React.FC<DropListProps> = ({
  userInfo
}) => {

  const navigate = useNavigate();

  const noRegisterHandler = () => {
    Modal.confirm({
      title: '提示信息',
      content: '请先完善用户信息',
      onOk() {
        navigate('/setting');
      }
    });
  };

  const checkUserRegister = (fn: () => void, handler?: () => void) => {
    const handleFn = handler ? handler : noRegisterHandler;
    if (userInfo && userInfo.status === UserStatus.NORMAL) {
      fn();
    } else {
      handleFn();
    }
  };

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
        checkUserRegister(() => { navigate(`/author/${userInfo!.id}`); });
      }
    },
    {
      title: '创作者中心',
      onClick() {
        checkUserRegister(() => { navigate('/creation-center'); });
      }
    },
    {
      title: '聊天',
      onClick() {
        checkUserRegister(() => { navigate('/chat'); });
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