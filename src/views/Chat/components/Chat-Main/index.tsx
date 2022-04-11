import { createMessage, getMessageListById } from '@/api/chat';
import CosUpload from '@/components/Cos-Upload';
import Emoji from '@/components/Emoji';
import { Chat } from '@/typings/chat';
import { ChatMessage, ChatMessageTypeEnum } from '@/typings/chat-message';
import { User } from '@/typings/user';
import { transformMessageByType } from '@/utils/chat';
import { Avatar, Icon, Input, Message, Modal, Popover, Spin } from '@arco-design/web-react';
import { IconBook, IconFaceSmileFill, IconFileImage, IconList, IconSend, IconUser } from '@arco-design/web-react/icon';
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
    setLoading(true);
    getMessageListById(chat.id).then(res => {
      setMessageList(res.data);
      setTimeout(() => {
        msgEndRef.current?.scrollIntoView();  
      }, 300);     
    }).catch(err => {
      Message.warning(err.message);
    }).finally(() => {
      setLoading(false);
    });
  };

  const changeList = (content: string, type: ChatMessageTypeEnum, chat_id: string, increment = false) => {
    const last_message = transformMessageByType(JSON.parse(content), type);
    const onChatListChange = onChatListChangeRef.current;
    if (onChatListChange && userInfo) {
      onChatListChange(chat_id, {
        update_time: new Date().toLocaleString(),
        last_message,
      }, increment);
    }
  };

  const afterReceived = (content: string, type: ChatMessageTypeEnum, chat_id: string, increment = false) => {
    changeList(content, type, chat_id, increment);    
    msgEndRef.current?.scrollIntoView();
  };

  const createMessage = (content: string, type: ChatMessageTypeEnum = ChatMessageTypeEnum.MESSAGE) => {
    if (chat && socket) {
      const message = {
        content,
        type,
        chat_id: chat.id,
      };
      socket.emit('message', {
        createMessageDto: message,
      });
    }
    setVal('');
  };

  const createTextMessage = () => {
    if (loading || !val) {
      return ;
    }
    createMessage(JSON.stringify({ value: val }));
  };

  const createImageMessage = (url: string) => {
    const content = JSON.stringify({ value: url });
    createMessage(content, ChatMessageTypeEnum.IMAGE);
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
      afterReceived(data.content, data.type, data.chat_id, true);
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
      afterReceived(data.content, data.type, data.chat_id);
    });
  };

  const handleUploadSuccess = (imgUrls: string[]) => {
    const img = imgUrls[0];
    Modal.confirm({
      title: '确认发送',
      content: (
        <div style={{ textAlign: 'center' }}>
          <img style={{ width: '80%', margin: '0 auto' }} src={img} />
        </div>
      ),
      onOk() {
        createImageMessage(img);
      }
    });
  };

  const handleSearch = (value: string) => {
    if (value) {
      const content = JSON.stringify({ value });
      createMessage(content, ChatMessageTypeEnum.ARTICLE);
    }
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
          { otherUser ? otherUser.name : '' }
        </span>
      </div>
      <div className={styles['chat-message-main-area']}>
        {
          !loading ? (
            messageList.map(item => (
              <ChatMessageItem 
                chatMessage={item} 
                key={item.id} 
                position={item.user_id === userInfo?.id ? 'right' : 'left'}
              />
            ))
          ) : <Spin />
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
          <div className={styles['chat-input-icon']}>
            <CosUpload  showUploadList={false} onUploadSuccess={handleUploadSuccess}>
              <IconFileImage fontSize={26}/>
            </CosUpload>
          </div>
          <div className={styles['chat-input-icon']}>
            <Popover 
              trigger='click' 
              content={
                <Input.Search searchButton="确认" 
                  placeholder="输入文章ID" 
                  onSearch={handleSearch} 
                />}>
              <IconBook fontSize={26} />
            </Popover>
          </div>
          <div className={styles['chat-main-area']}>
            <Input onPressEnter={createTextMessage} value={val} onChange={handleChange} />
          </div>
          <div className={styles['chat-send']}>
            <div className={styles['btn-wrapper']} onClick={createTextMessage}>
              <IconSend color="white"  fontSize={20}/>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default ChatMain;