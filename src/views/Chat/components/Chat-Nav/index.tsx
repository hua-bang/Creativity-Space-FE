/* eslint-disable react/display-name */
import { Chat } from '@/typings/chat';
import { ChatUser } from '@/typings/chat-user';
import { User } from '@/typings/user';
import { Avatar, Icon } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import ChatItem from './components/item';
import styles from './index.module.scss';

interface ChatNavProps {
  userInfo?: User;
  chatList: Chat[];
  selectChat?: Chat;
  onSelect: (id: string) => void;
}

const ChatNav = React.forwardRef((props: ChatNavProps, ref) => {

  const {
    userInfo,
    chatList,
    selectChat,
    onSelect,
  } = props;

  const [unreadCountMap, setUnreadCountMap] = useState<Record<string, number>>({});
  const [hasComputed, setHasComputed] = useState(false);

  useImperativeHandle(ref, () => ({
    reset(id: string) {
      setUnreadCountMap(prev => ({
        ...prev,
        [id]: 0,
      }));
    },
    increment(id: string, value: number) {
      setUnreadCountMap(prev => {
        const prevCount = prev[id] ? prev[id] : 0;
        return {
          ...prev,
          [id]: prevCount + value,
        };
      });
    }
  }));

  const handleSelect = (id: string) => {

    setUnreadCountMap(prev => {
      const nextState = {
        ...prev,
        [id]: 0,
      };
      if (selectChat) {
        nextState[selectChat.id] = 0;
      }
      return nextState;
    });
    onSelect && onSelect(id);
  };


  const getSelf = (chat: Chat) => {
    const selfChat = userInfo?.id === chat.chat_users[0].user_id ? (
      chat.chat_users[0]
    ) : chat.chat_users[1];
    return selfChat;
  };

  useEffect(() => {
    if (chatList.length > 0 && !hasComputed) {
      const map: Record<string, number> = {};
      chatList.forEach(chat => {
        const self = getSelf(chat);
        map[chat.id] = self.unread_count;
      });
      setUnreadCountMap(map);
      setHasComputed(true);
    }
  }, [chatList]);

  return (
    <div className={styles['chat-nav-wrapper']}>
      <div className={styles['chat-nav-header']}>
        <Avatar size={32}>
          {
            userInfo ?
              (<img src={userInfo.avatar} />)
              : <IconUser />
          }
        </Avatar>
        <span className={styles['chat-nav-tip']}>
          Message
        </span>
      </div>
      <div className={styles['chat-nav-list']}>
        {
          chatList.map(item => (
            <ChatItem
              userInfo={userInfo} 
              onSelect={handleSelect} 
              active={selectChat?.id === item.id}  
              chat={item} key={item.id}
              unreadCount={unreadCountMap[item.id] ?? 0}
            />
          ))          
        }
      </div>
    </div>
  );
});

export default ChatNav;