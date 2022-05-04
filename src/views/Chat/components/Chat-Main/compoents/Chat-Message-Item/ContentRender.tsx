import React from 'react';
import { ChatMessageTypeEnum } from '@/typings/chat-message';
import { Image } from '@arco-design/web-react';
import ChatArticle from '@/components/Chat-Article';
import ChatPoint from '@/components/Chat-Point';
import ChatBooklet from '@/components/Chat-Booklet';

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
          <Image width={300} src={data.value} />
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
  [ChatMessageTypeEnum.ARTICLE]: {
    render(data: any) {
      return (
        <ChatArticle articleId={data.value} />
      );
    }
  },
  [ChatMessageTypeEnum.POINT]: {
    render(data: any) {
      return (
        <ChatPoint pointId={data.value}/>
      );
    }
  },
  [ChatMessageTypeEnum.BOOKLET]: {
    render(data: any) {
      return (
        <ChatBooklet bookletId={data.value} />
      );
    }
  }
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