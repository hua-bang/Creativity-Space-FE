import React from 'react';
import styles from './index.module.scss';
import ContentList from '@/components/Content-List';
import { Avatar, Button } from '@arco-design/web-react';
import { Article } from '@/typings/article';

interface RecommendAreaProps {
  article?: Article;
}

const RecommendArea: React.FC<RecommendAreaProps> = ({
  article
}) => {
  
  return (
    <div className={styles['recommend-area']}>
      {
        article &&
        (
          <div className={styles['article-author-info']}>
            <div className={styles['article-author-basic-info']}>
              <Avatar>
                <img alt='avatar' src={article.user?.avatar} />
              </Avatar>
              <span className={styles['article-author-info-name']}>
                { article.user?.name ?? article.user?.username}
              </span>
            </div>
            <div className={styles['article-author-others-info']}>
              <div className={styles['article-author-count-item']}>
                <span>👍</span> 获取点赞 { article.user?.get_like_count}
              </div>
              <div className={styles['article-author-count-item']}>
                <span>👀</span> 文章被阅读数 { article.user?.get_view_count}
              </div>
            </div>
            <div className={styles['article-btn']}>
              <Button long type="primary">关注</Button>
            </div>
          </div>
        )
      }
      <ContentList />
    </div>
  );
};

export default RecommendArea;