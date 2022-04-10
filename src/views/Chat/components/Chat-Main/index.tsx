import { Chat } from '@/typings/chat';
import { User } from '@/typings/user';
import React from 'react';

interface ChatMainProps {
  userInfo?: User;
  chat?: Chat;
}

const ChatMain: React.FC<ChatMainProps> = ({
  chat
}) => {
  
  return (
    <div>
      {chat?.update_time}
    </div>
  );
};

export default ChatMain;