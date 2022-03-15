import { User } from '@/typings/user';
import React from 'react';
import styles from './index.module.scss';

interface AuthorPointListProps {
  author: User;
}

const AuthorPointList: React.FC<AuthorPointListProps> = () => {
  return (
    <div className={styles['author-point-list']}>
      author point
    </div>
  );
};

export default AuthorPointList;