import { Article } from '@/typings/article';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '@/api/article';
import { Message } from '@arco-design/web-react';
import styles from './index.module.scss';
import OperatorArea from './component/operator-area';
import RecommendArea from './component/recommend-area';
import ArticleArea from './component/article-area';
import SkeletonPage from '@/components/Skeleton-Page';

const ArticleDetail = () => {
  
  const [article, setArticle] = useState<Article>();

  const params = useParams();
  const articleId = params.id;

  const getArticleInfo = (id: string) => {
    getArticleById(id).then(res => {
      setTimeout(() => {
        setArticle(res.data);
      }, 500);
    }).catch(err => {
      Message.warning('获取文章详情失败，请刷新重试。');
    });
  };

  useEffect(() => {
    articleId && getArticleInfo(articleId);
  }, [articleId]);

  return article ? (
    <div className={styles['article-detail']}>
      <OperatorArea article={article} />
      <ArticleArea article={article} />
      <RecommendArea article={article} />
    </div>
  ) : (<SkeletonPage />);
};

export default ArticleDetail;