import { ChatMessageTypeEnum } from '@/typings/chat-message';

interface ContentProps {
  value: string;
  [key: string]: any;
}

export const ChatMessageTypeTransformMap = {
  [ChatMessageTypeEnum.MESSAGE]: (content: ContentProps) => {
    return content.value;
  },
  [ChatMessageTypeEnum.IMAGE]: (content: ContentProps) => {
    return '[图片信息]';
  },
  [ChatMessageTypeEnum.ARTICLE]: (content: ContentProps) => {
    return '[文章信息]';
  },
  [ChatMessageTypeEnum.URL]: (content: ContentProps) => {
    return '[链接信息]';
  },
};

export const transformMessageByType = (
  content: ContentProps,
  type: ChatMessageTypeEnum,
) => {
  return ChatMessageTypeTransformMap[type](content);
};
