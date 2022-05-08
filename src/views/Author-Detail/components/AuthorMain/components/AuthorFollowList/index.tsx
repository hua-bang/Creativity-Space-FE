import { getUserFollowArticle } from '@/api/article';
import ContentCard from '@/components/Content-Card';
import { Article } from '@/typings/article';
import { User } from '@/typings/user';
import { Button, Empty, Message } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface AuthorFollowListProps {
  author: User;
}

const AuthorFollowList: React.FC<AuthorFollowListProps> = ({
  author
}) => {

  const authorId = author.id;
  const [followList, setFollowList] = useState<Article[]>([]); 

  const loadList = () => {
    getUserFollowArticle(authorId).then(res => {
      setFollowList(res.data);
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  useEffect(() => {
    loadList();
  }, [author]);

  return (
    <div className={styles['author-article-list']}>
      {
        followList.length > 0 
          ? (
            followList.map(article => (
              <ContentCard canDelete={false} key={article.id} expand={false} article={article} />
            ))
          ):
          (
            <Empty
              imgSrc='https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp'
              description={<Button type='primary' onClick={loadList}>暂无数据，点击加载</Button>}
            />
          )
      }
    </div>
  );
};

export default AuthorFollowList;