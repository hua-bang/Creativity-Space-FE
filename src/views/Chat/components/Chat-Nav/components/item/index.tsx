import { Chat } from '@/typings/chat';
import dayjs from 'dayjs';
import React from 'react';
import styles from './index.module.scss';
import className from 'classnames';
import { User } from '@/typings/user';

interface ChatItemProps {
  chat: Chat;
  active?: boolean;
  userInfo?: User;
  onSelect: (id: string) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  active = false,
  onSelect,
  userInfo
}) => {

  const cls = className(styles['chat-item'], active ? styles['active'] : '');  
  
  const handleClick = () => {
    onSelect(chat.id);
  };

  const otherUser = userInfo?.id === chat.chat_users[0].user_id ? (
    chat.chat_users[1].user
  ) : chat.chat_users[0].user;
  
  return (
    <div className={cls} onClick={handleClick}>
      <div className={styles['chat-user-avatar']}>
        <img src={otherUser.avatar} />
      </div>
      <div className={styles['chat-info']}>
        <div className={styles['chat-user-name']}>
          { otherUser.name ?? 'hug' }
        </div>
        <div className={styles['chat-message']}>
          { chat.chat_users[0].last_message }
        </div>
      </div>
      <div className={styles['chat-time']}>
        { dayjs(chat.update_time).format('hh:mm:ss') }
      </div>
    </div>
  );
};

export default ChatItem;