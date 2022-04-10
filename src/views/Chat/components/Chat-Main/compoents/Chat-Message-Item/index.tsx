import { ChatMessage } from '@/typings/chat-message';
import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
import ContentRender from './ContentRender';

interface ChatMessageItemProps {
  chatMessage: ChatMessage;
  position?: 'left' | 'right'
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  chatMessage,
  position = 'left'
}) => {

  const contentCls = classNames(styles['chat-message-content'], position === 'right' ? styles['right'] : '');
  const wrapperCls = classNames(
    styles['chat-message-item-wrapper'], 
    position === 'right' ? styles['wrapper-right'] : ''
  );

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div className={wrapperCls}>
        {
          position === 'left' && (
            <div className={styles['chat-message-item-left-avatar']}>
              <img src={chatMessage.user?.avatar} />        
            </div>
          )
        }
        <div className={contentCls}>
          <ContentRender content={chatMessage.content} type={chatMessage.type} />
        </div>
        {
          position === 'right' && (
            <div className={styles['chat-message-item-right-avatar']}>
              <img src={chatMessage.user?.avatar} />        
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ChatMessageItem;