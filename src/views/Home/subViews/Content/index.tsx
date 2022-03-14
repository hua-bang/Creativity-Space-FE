import React, { useEffect, useState } from 'react';
import NavGroup from '../../../../components/Nav-Group';
import ContentCard from '../../../../components/Content-Card';
import styles from './index.module.scss';
import { getArticles } from '@/api/article';
import { Article } from '@/typings/article';
import { Spin } from '@arco-design/web-react';

const Content = () => {

  const [navKey, setNavKey] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);

  const handleActiveKeyChange = (activeKey: string) => {
    setNavKey(activeKey);
  };

  const loadArticles = (data?: Record<string,any>) => {
    setLoading(true);
    getArticles(data).then(res => {
      setArticles(res.data);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    const orderBy = navKey === 'Latest' ? 'create_time' : 'like_count';
    loadArticles({ orderBy });
  }, [navKey]);

  return (
    <div>
      <NavGroup defaultValue={navKey} onChange={handleActiveKeyChange} menuList={['Relevant', 'Latest']} />    
      <div className={styles['content-list']}>
        {
          loading 
            ? <Spin size={80} style={{ display: 'block', height: '100%', textAlign: 'center' }} />
            : (
              articles.map((item, index) => {
                return (
                  <ContentCard article={item} key={index} expand={index === 0 ? true : false } />
                );
              })
            ) 
        }
      </div>
    </div>
  );
};

export default Content;