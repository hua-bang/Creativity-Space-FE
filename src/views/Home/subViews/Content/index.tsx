import React, { useEffect, useState } from 'react';
import NavGroup from '../../../../components/Nav-Group';
import ContentCard from '../../../../components/Content-Card';
import styles from './index.module.scss';
import { getArticles } from '@/api/article';
import { Article } from '@/typings/article';
import { Spin } from '@arco-design/web-react';

const Content = () => {

  const [navKey, setNavKey] = useState<string>();
  const [hasLoad, setHasLoad] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);

  const handleActiveKeyChange = (activeKey: string) => {
    setNavKey(activeKey);
  };

  const loadArticles = () => {
    getArticles().then(res => {
      setArticles(res.data);
    }).finally(() => {
      setHasLoad(true);
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
          hasLoad ? (
            articles.map((item, index) => {
              return (
                <ContentCard article={item} key={index} expand={index === 0 ? true : false } />
              );
            })
          ) : <Spin size={80} style={{ display: 'block', height: '100%', textAlign: 'center' }} />
        }
      </div>
    </div>
  );
};

export default Content;