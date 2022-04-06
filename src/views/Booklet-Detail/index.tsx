import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import BookletItem from '@/components/Booklet-Item';
import { getBookletDetail } from '@/api/booklet';
import SkeletonPage from '@/components/Skeleton-Page';
import { Booklet } from '@/typings/booklet';
import { useParams } from 'react-router-dom';
import BookletMain from './components/BookletMain';
import BookletRecommendList from '@/components/Booklet-Recommend-List';

const BookletDetail = () => {

  const params = useParams(); 
  const bookletId = params.id; 

  const [booklet, setBooklet] = useState<Booklet>();

  const loadBooklet = (bookletId: string) => {
    getBookletDetail(bookletId).then(res => {
      setBooklet(res.data);
    });
  };

  useEffect(() => {
    bookletId && loadBooklet(bookletId);
  }, [bookletId]);

  return booklet ?
    (
      <div className={styles['booklet-detail-wrapper']}>
        <div className={styles['booklet-detail-info']}>
          <BookletItem booklet={booklet} />
        </div>
        <div className={styles['booklet-detail-container']}>
          <div className={styles['booklet-detail-main']}>
            <BookletMain booklet={booklet} />
          </div>
          <div className={styles['booklet-detail-list']}>
            <BookletRecommendList />
          </div>
        </div>
      </div>
    ) : (<SkeletonPage />);
};

export default BookletDetail;