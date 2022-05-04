import React, { useState } from "react";
import { Input, Radio } from '@arco-design/web-react';
import { ChatMessageTypeEnum } from '@/typings/chat-message';


const menus = {
  [ChatMessageTypeEnum.ARTICLE]: {
    title: '文章',
  },
  [ChatMessageTypeEnum.POINT]: {
    title: '动态',
  },
  [ChatMessageTypeEnum.BOOKLET]: {
    title: '小册',
  }
};

type MenuKey = keyof typeof menus;

const RadioGroup = Radio.Group;

interface ChatShareProps {
  onCreate: (data: string, type: ChatMessageTypeEnum, reset?: () => void) => void;
}

const ChatShare: React.FC<ChatShareProps> = ({
  onCreate
}) => {
  

  const [val, setVal] = useState('');
  const [type, setType] = useState<ChatMessageTypeEnum>(
    `${ChatMessageTypeEnum.ARTICLE}` as unknown as ChatMessageTypeEnum
  );

  const handleSearch = (value: string) => {
    if (value) {
      onCreate(value, type, () => setVal(''));
    }
  };

  const handleChange = (val: string) => {
    setType(val as unknown as ChatMessageTypeEnum);
  };

  const handleValChange = (val: string) => {
    setVal(val);
  };

  return (
    <div>
      类别：
      <RadioGroup value={type} onChange={handleChange} style={{ marginBottom: 20 }}>
        {
          Object.keys(menus).map(key => (
            <Radio key={key} value={key}>{menus[key as unknown as MenuKey].title}</Radio>   
          ))
        }
      </RadioGroup>
      <Input.Search searchButton="确认" 
        value={val}
        onChange={handleValChange}
        placeholder="输入ID" 
        onSearch={handleSearch} 
      />
    </div>
  );
};

export default ChatShare;