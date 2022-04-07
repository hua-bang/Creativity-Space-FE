import { getBookletDetail } from '@/api/booklet';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookletArticleById } from '@/api/booklet';
import styles from './index.module.scss';
import DetailHeader from './components/Header';
import SkeletonPage from '@/components/Skeleton-Page';
import { Booklet } from '@/typings/booklet';
import { BookletArticle } from '@/typings/booklet-article';
import ArticleMain from './components/Main';

const BookletArticleDetail = () => {
  
  const [booklet, setBooklet] = useState<Booklet>();
  const [article, setArticle] = useState<BookletArticle>();
  
  
  const navigate = useNavigate();

  const params = useParams();

  const bookletId = params.bookletId;

  const articleId = params.articleId;

  const loadBooklet = (bookletId: string) => {
    getBookletDetail(bookletId).then(res => {
      res.data.articles = res.data.articles.sort((a: BookletArticle, b: BookletArticle) => {
        return a.order - b. order;
      });
      setBooklet(res.data);
    });
  };

  const loadArticle = (articleId: string) => {
    getBookletArticleById(articleId).then(res => {
      setArticle(res.data);
    });
  };

  useEffect(() => {
    if (bookletId) {
      loadBooklet(bookletId);
    }
  }, [bookletId]);

  useEffect(() => {
    articleId && loadArticle(articleId);
  }, [articleId]);

  return (
    <div className={styles['article-detail-wrapper']}>
      {
        booklet && article ? (
          <>
            <DetailHeader booklet={booklet} />
            <ArticleMain booklet={booklet} article={article}/>
          </>
        ) : (<SkeletonPage />)       
      }      
    </div>
  );
};

export default BookletArticleDetail;