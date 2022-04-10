import { Chat } from '@/typings/chat';
import dayjs from 'dayjs';
import React from 'react';
import styles from './index.module.scss';
import className from 'classnames';

interface ChatItemProps {
  chat: Chat;
  active?: boolean;
  onSelect: (id: string) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  active = false,
  onSelect
}) => {

  const cls = className(styles['chat-item'], active ? styles['active'] : '');  
  
  const handleClick = () => {
    onSelect(chat.id);
  };
  
  return (
    <div className={cls} onClick={handleClick}>
      <div className={styles['chat-user-avatar']}>
        <img src="https://p9-passport.byteacctimg.com/img/user-avatar/76e2c861d9dc3009decff75214db090a~300x300.image" />
      </div>
      <div className={styles['chat-info']}>
        <div className={styles['chat-user-name']}>
          { chat.chat_users[1].user?.name ?? 'hug' }
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