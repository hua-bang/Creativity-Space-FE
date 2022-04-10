import React from 'react';
import { ChatMessageTypeEnum } from '@/typings/chat-message';

interface ContentRenderProps {
  content: string;
  type: ChatMessageTypeEnum;
}

interface TransformTextData {
  value: string;
}

const ContentMap = {
  [ChatMessageTypeEnum.MESSAGE]: {
    render(data: TransformTextData) {
      return (
        <>
          {data.value}
        </>
      );
    }
  },
  [ChatMessageTypeEnum.IMAGE]: {
    render(data: any) {
      return (
        <div>
          123
        </div>
      );
    }
  },
  [ChatMessageTypeEnum.URL]: {
    render(data: any) {
      return (
        <div>
          123
        </div>
      );
    }
  },
};

const ContentRender: React.FC<ContentRenderProps> = ({
  content,
  type = ChatMessageTypeEnum.MESSAGE
}) => {
  const data = JSON.parse(content);  

  return (
    ContentMap[type].render(data)
  );
};

export default ContentRender;