import React from 'react';
import { User as Author } from '@/typings/user';
import styles from './index.module.scss';
import { Button } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';

interface AuthorItemProps {
  author: Author;
}

const AuthorItem: React.FC<AuthorItemProps> = ({
  author
}) => {
  const navigate = useNavigate();

  const toAuthorDetail = () => {
    window.open(`/author/${author.id}`);
  };

  return (
    <div className={styles['author-item']}>
      <div className={styles['author-item-info']} onClick={toAuthorDetail}>
        <div className={styles['author-item-info-avatar']}>
          <img src={author.avatar} />
        </div>
        <div className={styles['author-item-info-main']}>
          <h4>{author.name}</h4>
          <p className={styles['job-title']}>{author.job_title}</p>
          <p>获得 {author.get_like_count} 赞 {author.get_view_count} 阅读</p>
        </div>
      </div>
      <div className={styles['author-item-btn']}>
        <Button size='large' onClick={toAuthorDetail} type='outline'>详情</Button>
      </div>
    </div>
  );
};

export default AuthorItem;