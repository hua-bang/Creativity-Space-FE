import React from 'react';
import { User } from '@/typings/user';
import { Avatar, Popover } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';


interface UserAvatarItemProps {
  user: User;
  size?: number;
}

const UserAvatarItem: React.FC<UserAvatarItemProps> = ({
  user,
  size = 40
}) => {

  const navigate = useNavigate();

  const toUserDetail = (id: string) => {
    navigate(`/author/${id}`);
  };

  return (
    <div className={styles['user-avatar-wrapper']} onClick={() => toUserDetail(user.id)}>
      <Popover
        title={user.username}
      >
        <Avatar size={size}>
          {
            user.avatar ? (
              <img src={user.avatar} />
            ) : <IconUser />
          }
        </Avatar>    
      </Popover>
      
    </div>
  );
};

export default UserAvatarItem;