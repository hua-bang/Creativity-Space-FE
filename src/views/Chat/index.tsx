import useToken from '@/hooks/useToken';
import { Button } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import styles from './index.module.scss';
import ChatNav from './components/Chat-Nav';
import ChatMain from './components/Chat-Main';
import { getUserList } from '@/api/chat';
import { Chat } from '@/typings/chat';


const ChatRoom = () => {
 
  const [token] = useToken();
  
  const [socket, setSocket] = useState<Socket>();
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { userStore } = useStore();
  const [chat, setChat] = useState<Chat>(); 

  const userInfo = userStore.userInfo;

  const connect = () => {
    const ws =  io('http://localhost:4000', { 
      autoConnect: true,
      transports: ['websocket'],
      auth: {
        token
      },
    });
    setSocket(ws);
  };

  const send = () => {
    socket && socket.emit('message', { message: 'hug' }, (data: any) => {
      console.log(data);
    });
  };

  const load = () => {
    getUserList().then(res => {
      const list = res.data;
      setChatList(res.data);
      if (list.length > 0) {
        setChat(list[0]);
      }
    });
  };

  const handleSelect = (id: string) => {
    if (chat && id === chat.id) {
      return;
    }
    const selectChat = chatList.find(chat => chat.id === id);
    if (selectChat) {
      setChat(selectChat);
    }
  };

  const otherUser = userInfo?.id === chat?.chat_users[0].user_id ? (
    chat?.chat_users[1].user
  ) : chat?.chat_users[0].user;
  
  useEffect(() => {
    load();
  }, []);

  const handleChatListChange = (id: string, chat: Partial<Chat>) => {
    const target = chatList.find(item => item.id === id);
    if (target) {
      const newTarget = {
        ...target,
        ...chat
      };
      const otherChat = chatList.filter(item => item.id !== id);
      setChatList([newTarget, ...otherChat]);
    }
  };

  return (
    <div className={styles['chat-wrapper']}>
      <div className={styles['left-chat-nav']}>
        <ChatNav selectChat={chat} onSelect={handleSelect} chatList={chatList} userInfo={userInfo} />
      </div>
      <div className={styles['right-chat-main']}>
        <ChatMain onChatListChange={handleChatListChange} otherUser={otherUser} userInfo={userInfo} chat={chat} />
      </div>
    </div>
  );
};

export default observer(ChatRoom);