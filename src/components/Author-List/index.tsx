import React, { useState } from 'react';
import { Card, Link } from '@arco-design/web-react';
import { mockAuthorList } from './mockData';
import styles from './index.module.scss';

const AuthorList = () => {
  const [authorList, setAuthorList] = useState(mockAuthorList);

  return (
    <Card 
      bodyStyle={{ padding: '0' }} 
      style={{ borderRadius: '5px 5px 0 0'}} 
      title='🎖️作者榜' 
      extra={<Link>查看全部</Link>}
    >
      {
        authorList.map(author => (
          <div className={styles['author-item']} key={author.user_id}>
            <div className={styles['author-avatar']}>
              <img src={author.avatar_large} />
            </div>
            <div className={styles['author-info']}>
              <div className={styles['author-name']}>
                {author.user_name}
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