import { User } from '@/typings/user';
import React from 'react';
import styles from './index.module.scss';

interface AuthorArticleListProps {
  author: User;
}

const AuthorArticleList: React.FC<AuthorArticleListProps> = ({
  author
}) => {
  return (
    <div className={styles['author-article-list']}>
      article list
    </div>
  );
};

export default AuthorArticleList;