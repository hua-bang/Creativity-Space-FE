import { User } from '@/typings/user';
import React from 'react';
import styles from './index.module.scss';

interface AuthorCountInfoProps {
  author: User
}

const AuthorCountInfo: React.FC<AuthorCountInfoProps> = () => {
  return (
    <div className={styles['author-count-info']}>123</div>
  );
};

export default AuthorCountInfo;