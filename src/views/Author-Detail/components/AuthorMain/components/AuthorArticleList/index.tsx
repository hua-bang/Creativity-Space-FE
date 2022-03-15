import ContentCard from '@/components/Content-Card';
import { User } from '@/typings/user';
import React from 'react';
import styles from './index.module.scss';

interface AuthorArticleListProps {
  author: User;
}

const AuthorArticleList: React.FC<AuthorArticleListProps> = ({
  author
}) => {

  const { articles } = author;

  const temp = articles.map(article => {
    article.user = author;
    return article;
  });

  return (
    <div className={styles['author-article-list']}>
      {
        temp.map(article => (
          <ContentCard key={article.id} expand={false} article={article} />
        ))
      }
    </div>
  );
};

export default AuthorArticleList;