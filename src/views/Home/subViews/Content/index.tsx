import React, { useEffect, useState } from 'react';
import NavGroup from '../../../../components/Nav-Group';
import ContentCard from '../../../../components/Content-Card';
import styles from './index.module.scss';
import { getArticles } from '@/api/article';
import { Article } from '@/typings/article';

const Content = () => {

  const [navKey, setNavKey] = useState<string>();
  const [articles, setArticles] = useState<Article[]>([]);

  const handleActiveKeyChange = (activeKey: string) => {
    setNavKey(activeKey);
  };

  const loadArticles = () => {
    getArticles().then(res => {
      setArticles(res.data);
    });
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div>
      <NavGroup defaultValue={navKey} onChange={handleActiveKeyChange} menuList={['Relevant', 'Latest']} />    
      <div className={styles['content-list']}>
        {
          articles.map((item, index) => {
            return (
              <ContentCard article={item} key={index} expand={index === 0 ? true : false } />
            );
          })
        }
      </div>
    </div>
  );
};

export default Content;