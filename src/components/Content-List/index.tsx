import React, { useEffect, useState } from 'react';
import { Card, Link } from '@arco-design/web-react';
import { mockContent } from './mockData';
import styles from './index.module.scss';
import { getArticles } from '@/api/article';
import { Article } from '@/typings/article';


const ContentList = () => {
  const [ contentList, setContentList ] = useState<Article[]>([]);

  useEffect(() => {
    getArticles().then(res => {
      setContentList(res.data);
    });
  }, []);


  return (
    <Card style={{ borderRadius: '5px 5px 0 0'}} title='📜推荐文章' extra={<Link>查看全部</Link>}>
      {
        contentList.map((content) => (
          <div className={styles['content-item']} key={content.title} >
            <div className={styles['content-title']}>
              {content.title}
            </div>
            <div className={styles['content-count-info']}>
              <span>{content.like_count}点赞</span>
              <span>{content.comment_count}评论</span>
            </div>
          </div>
        ))
      }
    </Card>
  );
};

export default ContentList;