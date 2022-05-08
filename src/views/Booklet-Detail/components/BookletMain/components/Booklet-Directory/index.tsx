import { getArticlesByBookletId } from '@/api/booklet';
import { Booklet } from '@/typings/booklet';
import { BookletArticle } from '@/typings/booklet-article';
import { Message } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import SectionItem from './components/Section-Item';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';


interface BookletDirectoryProps {
  booklet: Booklet;
}

const BookletDirectory: React.FC<BookletDirectoryProps> = ({
  booklet
}) => {

  const [articles, setArticles] = useState<BookletArticle[]>([]);
  const bookletId = booklet.id;
  const navigate = useNavigate();

  const loadBookArticle = (bookletId: string) => {
    getArticlesByBookletId(bookletId).then(res => {
      const list = (res.data as BookletArticle[]).sort((a, b) => a.order - b.order);
      setArticles(list);
    }).catch(err => {
      Message.warning('拉取小册文章失败。');
    });
  };
  
  useEffect(() => {
    bookletId && loadBookArticle(bookletId);
  }, [bookletId]);

  return (
    <div className={styles['section-wrapper']}>
      <div className={styles['section-title']}>
        小册内容
      </div>
      <div className={styles['section-container']}>
        {
          articles.map((item, index) => (
            <SectionItem 
              onClick={
                () => { 
                  navigate(`/booklet/${bookletId}/article/${item.id}`); 
                }
              } 
              key={item.id} 
              index={index + 1} 
              title={item.title} 
              status={item.status} 
            />
          ))
        }
      </div>
    </div>
  );
};

export default BookletDirectory;