import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import { getArticleById } from '@/api/article';
import { Article } from "@/typings/article";
import { Button, Empty, Message } from "@arco-design/web-react";
import ContentCard from '@/components/Content-Card';

interface ChatArticleProps {
  articleId: string;
}

const ChatArticle: React.FC<ChatArticleProps> = ({
  articleId,
}) => {

  const [article, setArticle] = useState<Article>();

  const loadArticle = (articleId: string) => {
    getArticleById(articleId).then(res => {
      setArticle(res.data);
    }).catch(err => console.warn);
  };

  useEffect(() => {
    loadArticle(articleId);
  }, [articleId]);

  return (
    <div className={styles['chat-article-wrapper']}>
      { 
        article ? (
          <ContentCard article={article} />
        ) : (
          <Empty
            imgSrc='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp'
            description={<Button type='primary'>无文章信息</Button>}
          />
        )
      }
    </div>
  );
};

export default ChatArticle;