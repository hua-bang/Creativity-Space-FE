import { createMessage, getMessageListById } from '@/api/chat';
import Emoji from '@/components/Emoji';
import { Chat } from '@/typings/chat';
import { ChatMessage, ChatMessageTypeEnum } from '@/typings/chat-message';
import { User } from '@/typings/user';
import { Avatar, Icon, Input, Message, Popover } from '@arco-design/web-react';
import { IconFaceSmileFill, IconSend, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react';
import ChatMessageItem from './compoents/Chat-Message-Item';
import styles from './index.module.scss';

interface ChatMainProps {
  userInfo?: User;
  chat?: Chat;
  otherUser?: User;
}

const ChatMain: React.FC<ChatMainProps> = ({
  chat,
  userInfo,
  otherUser
}) => {

  const [val, setVal] = useState(''); 
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);

  const handleChange = (value: string) => {
    setVal(value);
  };

  
  const loadChatMessage = (chat: Chat) => {
    getMessageListById(chat.id).then(res => {
      setMessageList(res.data);
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  const create = () => {
    if (chat && val) {
      const message = {
        content: JSON.stringify({ value: val }),
        chat_id: chat.id,
        type: ChatMessageTypeEnum.MESSAGE
      };
      createMessage(message).then(res => {
        setVal('');
        loadChatMessage(chat);
      }).catch(err => {
        Message.warning(err.message);
      });
    }
  };

  const handleChoose = (emoji: string) => {
    setVal(prev => prev + emoji);
  };

  useEffect(() => {
    chat && loadChatMessage(chat);    
  }, [chat]);
  
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