import React from 'react';
import { User } from '@/typings/user';
import styles from './index.module.scss';
import { Button, Message } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import { createChat } from '@/api/chat';

interface ChatUserItemProps {
  user: User;
  canChat?: boolean;
}

const ChatUserItem: React.FC<ChatUserItemProps> = ({
  user,
  canChat = false
}) => {
  const navigate = useNavigate();

  const create = () => {
    createChat(user.id).then(res => {
      const { id } = res.data;
      navigate(`/chat?chat_id=${id}`);
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  return (
    <div className={styles['author-item']}>
      <div className={styles['author-item-info']}>
        <div className={styles['author-item-info-avatar']}>
          <img src={user.avatar} />
        </div>
        <div className={styles['author-item-info-main']}>
          <h4>{user.name}</h4>
        </div>
      </div>
      <div className={styles['author-item-btn']}>
        <Button disabled={!canChat} size='large'  type='outline' onClick={create}>
          { canChat ? '聊天' : '需要登录' }
        </Button>
      </div>
    </div>
  );
};

export default ChatUserItem;