import { User } from '@/typings/user';
import { Card } from '@arco-design/web-react';
import React from 'react';
import styles from './index.module.scss';
import AuthorList from '@/components/Author-List';

interface AuthorCountInfoProps {
  author: User
}

const AuthorCountInfo: React.FC<AuthorCountInfoProps> = ({
  author
}) => {
  return (
    <div className={styles['author-count-info']}>
      <div className={styles['author-achievement-info']}>
        <Card bordered={false} title="个人成就">
          <div className={styles['article-author-others-info']}>
            <div className={styles['article-author-count-item']}>
              <span>👍</span> 获取点赞 { author.get_like_count}
            </div>
            <div className={styles['article-author-count-item']}>
              <span>👀</span> 文章被阅读数 { author.get_view_count}
            </div>
          </div>
        </Card>
      </div>
      <div className={styles['author-follow-info']}>
        <div>
          <div>关注了</div>
          <div>{author.follow_count}</div>
        </div>
        <div>
          <div>关注者</div>
          <div>{author.follow_count}</div>
        </div>
      </div>
      <div className={styles['author-recommend-list']}>
        <AuthorList bordered={false} />
      </div>
    </div>
  );
};

export default AuthorCountInfo;