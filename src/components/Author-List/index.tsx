import React, { useEffect, useState } from 'react';
import { Card, Link } from '@arco-design/web-react';
import styles from './index.module.scss';
import { User } from '@/typings/user';
import { getAuthors } from '@/api/common';

const AuthorList = () => {
  const [authorList, setAuthorList] = useState<User[]>([]);

  useEffect(() => {
    getAuthors().then(res => {
      setAuthorList(res.data);
    });
  }, []);


  return (
    <Card 
      bodyStyle={{ padding: '0' }} 
      style={{ borderRadius: '5px 5px 0 0'}} 
      title='🎖️作者榜' 
      extra={<Link>查看全部</Link>}
    >
      {
        authorList.map(author => (
          <div className={styles['author-item']} key={author.id}>
            <div className={styles['author-avatar']}>
              <img src={author.avatar} style={{ width: '40px' }} />
            </div>
            <div className={styles['author-info']}>
              <div className={styles['author-name']}>
                {author.name}
              </div>
              <div className={styles['job-title']}>
                {author.job_title}  
              </div>
            </div>
          </div>
        ))
      }
    </Card>
  );
};

export default AuthorList;