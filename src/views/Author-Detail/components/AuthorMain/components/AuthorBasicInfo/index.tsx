import { User } from '@/typings/user';
import { Button, Message } from '@arco-design/web-react';
import React from 'react';
import styles from './index.module.scss';

interface AuthorBasicInfoProps {
  author: User;
  userInfo?: User;
}

const AuthorBasicInfo: React.FC<AuthorBasicInfoProps> = ({
  author,
  userInfo
}) => {
  const isSelf = userInfo?.id === author.id;

  const follow = () => {
    Message.success('关注成功');
  };

  return (
    <div className={styles['author-basic-info']}>
      <div className={styles['author-basic-info-image']}>
        <img src={author.avatar} />
      </div>
      <div className={styles['author-basic-info-content']}>
        <div className={styles['author-basic-info-name']}>{author.name}</div>
        <div className={styles['author-basic-info-introduct']}>
          <div className={styles['author-basic-info-introdcut-left']}>
            <div>
              {`👨‍💻  `} 
              {author.job_title} | {author.company}
            </div>
            <div>
              {`📚  ${author.description}`}
            </div>
            <div>
              {`🌐  ${author.home_page}`}
            </div>
          </div>
          {
            !isSelf && (    
              <div className={styles['author-basic-info-introdcut-right']}>
                <Button onClick={follow} type='outline' style={{ width: '80px' }}>关注</Button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AuthorBasicInfo;