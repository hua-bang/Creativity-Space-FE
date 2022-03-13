import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { User } from '@/typings/user';
import { getAuthors } from '@/api/common';
import { Message } from '@arco-design/web-react';
import AuthorItem from '@/components/Author-Item';

const Author = () => {

  const [authorArr, setAuthorArr] = useState<User[]>([]);

  useEffect(() => {
    getAuthors().then(res => {
      setAuthorArr(res.data);
    }).catch(_ => {
      Message.warning('获取作者列表失败。');
    });
  }, []);

  return (
    <div className={styles['author-list']}>
      {
        authorArr.map(item => ( <AuthorItem key={item.id} author={item} /> ))
      }
    </div>
  );
};

export default Author;