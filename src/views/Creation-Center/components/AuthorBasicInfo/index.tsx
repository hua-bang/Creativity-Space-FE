import { User } from '@/typings/user';
import { Button, Message, Avatar } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';
import React from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

interface AuthorBasicInfoProps {
  userInfo: User;
}

const AuthorBasicInfo: React.FC<AuthorBasicInfoProps> = ({
  userInfo
}) => {
  const author = userInfo;

  const navigate = useNavigate();

  const toAuthorDetail = () => {
    navigate(`/author/${userInfo.id}`);
  };
 
  return (
    <div className={styles['author-basic-info']}>
      <div className={styles['author-basic-info-image']}>
        <Avatar size={80}>
          { 
            author.avatar 
              ? (<img src={author.avatar} />)
              : <IconUser /> 
          }
        </Avatar>
        

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
          <div className={styles['author-basic-info-introdcut-right']}>
            <Button onClick={toAuthorDetail} type='outline'>
              个人首页
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBasicInfo;