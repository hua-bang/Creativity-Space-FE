import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import AuthorMain from './components/AuthorMain';
import AuthorCountInfo from './components/AuthorCountInfo';
import { getAuthorById } from '@/api/common';
import { useParams } from 'react-router-dom';
import { Message } from '@arco-design/web-react';
import { User } from '@/typings/user';
import SkeletonPage from '@/components/Skeleton-Page';

const AuthorDetail: React.FC = () => {

  const params = useParams();
  const authorId = params.id;

  const [author, setAuthor] = useState<User>();

  const getAuthor = (id: string) => {
    getAuthorById(id).then(res => {
      setAuthor(res.data);
    }).catch(err => {
      Message.info('获取作者信息失败.');
    });
  };

  useEffect(() => {
    authorId && getAuthor(authorId);
  }, []);

  return (
    author 
      ? (<div className={styles['author-detail']}>
        <div className={styles['author-main']}>
          <AuthorMain author={author} />
        </div>
        <div className={styles['author-info']}>
          <AuthorCountInfo author={author} />
        </div>
      </div>)
      : (
        <SkeletonPage />
      )
  );
};

export default AuthorDetail;