import React from 'react';
import styles from './index.module.scss';
import AuthorBasicInfo from './components/AuthorBasicInfo';
import { User } from '@/typings/user';
import AuthorArticleList from './components/AuthorArticleList';

interface AuthorMainProps {
  author: User;
}

const AuthorMain: React.FC<AuthorMainProps> = ({
  author
}) => {

  return (
    <div className={styles['author-main']}>
      <AuthorBasicInfo author={author} />
      <AuthorArticleList author={author}/>
    </div>
  );
};

export default AuthorMain;