import useToken from '@/hooks/useToken';
import { Button } from '@arco-design/web-react';
import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import styles from './index.module.scss';
import ChatNav from './components/Chat-Nav';
import ChatMain from './components/Chat-Main';
import { getUserList } from '@/api/chat';
import { Chat } from '@/typings/chat';
import dayjs from 'dayjs';


const ChatRoom = () => {
 
  const [token] = useToken();
  
  const [socket, setSocket] = useState<Socket>();
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { userStore } = useStore();
  const [chat, setChat] = useState<Chat>(); 
  const chatNavRef = useRef<any>();

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

  const load = () => {
    getUserList().then(res => {
      const list = res.data.sort((a: Chat, b: Chat) => {
        return (dayjs(b.update_time).unix() - dayjs(a.update_time).unix());
      });
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

  useEffect(() => {
    connect();
  }, [userInfo]);

  const handleChatListChange = (id: string, chat: Partial<Chat>, increment = false) => {
    const target = chatList.find(item => item.id === id);
    if (target) {
      const newTarget = {
        ...target,
        ...chat
      };
      const otherChat = chatList.filter(item => item.id !== id);
      setChatList([newTarget, ...otherChat]);
      increment && chatNavRef.current.increment(id, 1);
    }
  };

  return (
    <div className={styles['chat-wrapper']}>
      <div className={styles['left-chat-nav']}>
        <ChatNav ref={chatNavRef} selectChat={chat} onSelect={handleSelect} chatList={chatList} userInfo={userInfo} />
      </div>
      <div className={styles['right-chat-main']}>
        <ChatMain 
          socket={socket} 
          onChatListChange={handleChatListChange} 
          otherUser={otherUser} 
          userInfo={userInfo} 
          chat={chat} />
      </div>
    </div>
  );
};

export default observer(ChatRoom);