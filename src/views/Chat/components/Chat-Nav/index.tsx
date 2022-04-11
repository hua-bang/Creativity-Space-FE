import { Chat } from '@/typings/chat';
import { ChatUser } from '@/typings/chat-user';
import { User } from '@/typings/user';
import { Avatar, Icon } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';
import React from 'react';
import ChatItem from './components/item';
import styles from './index.module.scss';

interface ChatNavProps {
  userInfo?: User;
  chatList: Chat[];
  selectChat?: Chat;
  onSelect: (id: string) => void;
}

const ChatNav: React.FC<ChatNavProps> = ({
  userInfo,
  chatList,
  selectChat,
  onSelect,
}) => {

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
              onSelect={onSelect} 
              active={selectChat?.id === item.id}  
              chat={item} key={item.id} 
            />
          ))          
        }
      </div>
    </div>
  );
};

export default ChatNav;