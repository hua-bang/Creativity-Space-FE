/* eslint-disable react/display-name */
import { Chat } from '@/typings/chat';
import dayjs from 'dayjs';
import React, { useImperativeHandle, useState } from 'react';
import styles from './index.module.scss';
import className from 'classnames';
import { User } from '@/typings/user';

interface ChatItemProps {
  chat: Chat;
  active?: boolean;
  userInfo?: User;
  onSelect: (id: string) => void;
  unreadCount: number;
}

const ChatItem = React.forwardRef((props: ChatItemProps, ref) => {

  const {    
    chat,
    active = false,
    onSelect,
    userInfo,
    unreadCount
  } = props;
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
          { chat.last_message }
        </div>
      </div>
      <div className={styles['chat-time']}>
        { dayjs(chat.update_time).format('hh:mm:ss') }
        {
          !active && unreadCount > 0 && (
            <div className={styles['unread-count']}>
              {unreadCount}
            </div>
          )
        }
      </div>
    </div>
  );
});

export default ChatItem;