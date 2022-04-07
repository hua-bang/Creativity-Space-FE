import { Booklet } from '@/typings/booklet';
import { BookletArticle } from '@/typings/booklet-article';
import React, { useState } from 'react';
import styles from './index.module.scss';
import SectionItem from './components/Section-Item';
import MarkdownView from '@/components/Markdown-View';
import { useNavigate, useParams } from 'react-router-dom';

interface ArticleDetailMainProps {
  booklet: Booklet;
  article: BookletArticle;
}

const ArticleDetailMain: React.FC<ArticleDetailMainProps> = ({
  booklet,
  article
}) => {

  const params = useParams();
  const navigate = useNavigate();
  const articleId = params.articleId;

  const toArticleById = (id: string) => {
    navigate(`/booklet/${booklet.id}/article/${id}`);
  };

  return (
    <div className={styles['detail-main-wrapper']}>
      <div className={styles['detail-main-nav']}>
        {
          booklet.articles.map((item, index) => (
            <SectionItem
              onClick={() => { toArticleById(item.id); }}
              status={item.status} 
              active={articleId === item.id} 
              key={item.id} title={item.title} 
              index={index + 1} 
            />
          ))
        }
      </div>
      <div className={styles['detail-main-content-wrapper']}>
        <div className={styles['detail-main-content']}>
          <MarkdownView  value={article.content} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailMain;