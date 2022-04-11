import { createMessage, getMessageListById } from '@/api/chat';
import Emoji from '@/components/Emoji';
import { Chat } from '@/typings/chat';
import { ChatMessage, ChatMessageTypeEnum } from '@/typings/chat-message';
import { User } from '@/typings/user';
import { Avatar, Icon, Input, Message, Popover } from '@arco-design/web-react';
import { IconFaceSmileFill, IconSend, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import ChatMessageItem from './compoents/Chat-Message-Item';
import styles from './index.module.scss';

interface ChatMainProps {
  socket?: Socket;
  userInfo?: User;
  chat?: Chat;
  otherUser?: User;
  onChatListChange?: (id: string, chat: Partial<Chat>, increment?: boolean) => void;
}

const ChatMain: React.FC<ChatMainProps> = ({
  chat,
  socket,
  userInfo,
  otherUser,
  onChatListChange,
}) => {

  const [val, setVal] = useState(''); 
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const msgEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat>();
  const onChatListChangeRef = useRef<ChatMainProps['onChatListChange']>();

  const handleChange = (value: string) => {
    setVal(value);
  };
  
  const loadChatMessage = (chat: Chat) => {
    getMessageListById(chat.id).then(res => {
      setMessageList(res.data);
      msgEndRef.current?.scrollIntoView();
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  const changeList = (content: string, chat_id: string, increment = false) => {
    const { value } = JSON.parse(content);
    const onChatListChange = onChatListChangeRef.current;
    if (onChatListChange && userInfo) {
      onChatListChange(chat_id, {
        update_time: new Date().toLocaleString(),
        last_message: value,
      }, increment);
    }
  };

  const afterReceived = (content: string, chat_id: string, increment = false) => {
    changeList(content, chat_id, increment);    
    msgEndRef.current?.scrollIntoView();
  };

  const create = () => {
    if (loading) {
      return ;
    }
    if (chat && val && socket) {
      setLoading(true);
      const message = {
        content: JSON.stringify({ value: val }),
        chat_id: chat.id,
        type: ChatMessageTypeEnum.MESSAGE
      };
      socket.emit('message', {
        createMessageDto: message,
      });
      setLoading(false);
      setVal('');
    }
  };

  const handleChoose = (emoji: string) => {
    setVal(prev => prev + emoji);
  };

  const initSocketEvent = (socket: Socket) => {
    socket.on('roomMessage', (data) => {
      const chat = chatRef.current;
      if (data.chat_id === chat?.id) {
        setMessageList((prev) => [
          ...prev,
          data
        ]);
      }
      afterReceived(data.content, data.chat_id, true);
    });
    socket.on('sendSuccess', (data) => {
      const chat = chatRef.current;
      const newMessage = {
        ...data,
        user: userInfo,
      };
      if (data.chat_id === chat?.id) {
        setMessageList((prev => [
          ...prev,
          newMessage,
        ]));
      }
      afterReceived(data.content, data.chat_id);
    });
  };

  useEffect(() => {
    if (chat) {
      loadChatMessage(chat);
      chatRef.current = chat;  
    }
  }, [chat]);

  useEffect(() => {
    if (socket) {
      initSocketEvent(socket);
    }
  }, [socket]);

  useEffect(() => {
    onChatListChangeRef.current = onChatListChange;
  }, [onChatListChange]);
  
  return (
    <div className={styles['chat-main-wrapper']}>
      <div className={styles['chat-main-nav']}>
        <Avatar size={32}>
          {
            otherUser 
              ? (<img src={otherUser.avatar} />)
              : <IconUser />
          }
        </Avatar>
        <span className={styles['chat-main-name']}>
          { otherUser ? otherUser.name : 'hug' }
        </span>
      </div>
      <div className={styles['chat-message-main-area']}>
        { 
          messageList.map(item => (
            <ChatMessageItem 
              chatMessage={item} 
              key={item.id} 
              position={item.user_id === userInfo?.id ? 'right' : 'left'}
            />
          ))
        }
        <div ref={msgEndRef} style={{ height: '0', overflow: 'hidden' }}></div>
      </div>
      <div className={styles['chat-input']}>
        <div className={styles['chat-input-main']}>
          <div className={styles['chat-input-icon']}>
            <Popover trigger="click" content={<Emoji onChoose={handleChoose} />}>
              <IconFaceSmileFill fontSize={26}/>
            </Popover>
          </div>
          <div className={styles['chat-main-area']}>
            <Input onPressEnter={create} value={val} onChange={handleChange} />
          </div>
          <div className={styles['chat-send']}>
            <div className={styles['btn-wrapper']} onClick={create}>
              <IconSend color="white"  fontSize={20}/>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default ChatMain;