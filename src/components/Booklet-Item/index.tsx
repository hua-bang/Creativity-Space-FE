import { Booklet } from '@/typings/booklet';
import { Avatar } from '@arco-design/web-react';
import React from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

interface BookletItemProps {
  booklet: Booklet;
}

const BookletItem: React.FC<BookletItemProps> = (props) => {
  
  const { booklet } = props;

  const navigate = useNavigate();

  const toDetail = () => {
    navigate(`/booklet/detail/${booklet.id}`);
  };

  return (
    <div className={styles['booklet-item-wrapper']}>
      <div className={styles['booklet-item']} onClick={toDetail}>
        <div className={styles['booklet-item-img']}>
          <img src={booklet.cover_url} />
        </div>
        <div className={styles['booklet-item-info']}>
          <div className={styles['booklet-info-name']}>
            {booklet.name}
          </div>
          <div className={styles['booklet-info-description']}>
            {booklet.description}
          </div>
          <div className={styles['booklet-info-user']}>
            <Avatar size={32}>
              <img src={booklet.user.avatar} />
            </Avatar>
            <span>
              <span>{booklet.user.name}</span>
              <span className={styles['user-info-description']}>
                {booklet.user.job_title} @ {booklet.user.company}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookletItem;