import ContentCard from '@/components/Content-Card';
import { User } from '@/typings/user';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { getArticleByAuthorId } from '@/api/article';
import { Article, ArticleStatusEnum } from '@/typings/article';
import { Message, Empty, Button } from '@arco-design/web-react';

interface AuthorArticleListProps {
  author: User;
  userInfo?: User;
}

const AuthorArticleList: React.FC<AuthorArticleListProps> = ({
  author,
  userInfo,
}) => {

  const { id } = author;
  const [articles, setArticles] = useState<Article[]>([]);

  const canDeleteArticle = userInfo?.id === author.id;

  const loadArticleData = () => {
    getArticleByAuthorId(id).then(res => {
      const data = res.data.filter((item: Article) => (item.status === ArticleStatusEnum.AUDITED));
      setArticles(data);
      if(data.length === 0) {
        Message.info('该作者还没有文章喔。');
      }
    }).catch(err => {
      Message.info('获取文章列表失败');
    });
  };

  useEffect(() => {
    loadArticleData();
  }, [id]);

  return (
    <div className={styles['author-article-list']}>
      {
        articles.length > 0 
          ? (
            articles.map(article => (
              <ContentCard canDelete={canDeleteArticle} key={article.id} expand={false} article={article} />
            ))
          ):
          (
            <Empty
              imgSrc='https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp'
              description={<Button type='primary' onClick={loadArticleData}>暂无数据，点击加载</Button>}
            />
          )
      }
    </div>
  );
};

export default AuthorArticleList;