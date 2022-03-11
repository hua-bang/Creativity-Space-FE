import { Article } from '@/typings/article';
import { Skeleton } from '@arco-design/web-react';
import React from 'react';
import styles from './index.module.scss';
import { Viewer } from '@bytemd/react';
import Avatar from '@arco-design/web-react/es/Avatar/avatar';

interface ArticleAreaProps {
  article?: Article;
}

const ArticleArea: React.FC<ArticleAreaProps> = ({
  article
}) => {
  return (
    <div className={styles['article-area']}>
      {
        article ?
          (
            <div className={styles['article-main']}>
              <div className={styles['article-img']}>
                <img src={article.cover_url} />
              </div>
              <div className={styles['article-author-info']}>
                <Avatar>
                  <img alt='avatar' src={article.user?.avatar} />
                </Avatar>
                <span className={styles['article-author-info-name']}>
                  { article.user?.name ?? article.user?.username}
                </span>
              </div>
              <div className={styles['article-title']}>
                {article.title}
              </div>
              <div className={styles['article-content']}>
                <Viewer value={article.content}/>
              </div>
            </div>
          ) :
          (<Skeleton style={{ height: '100%', width: '100%' }} />)
      }
    </div>
  );
};

export default ArticleArea;