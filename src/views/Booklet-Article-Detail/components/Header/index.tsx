import React from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { Booklet } from '@/typings/booklet';

interface HeaderProps {
  booklet: Booklet;
}

const Header: React.FC<HeaderProps> = ({
  booklet
}) => {
  
  const navigate = useNavigate();

  const toHomePage = () => {
    navigate('/home/booklet');
  };

  const toBooklet = () => {
    navigate(`/booklet/detail/${booklet.id}`);
  };

  return (
    <div className={styles['article-detail-header']}>
      <div className={styles['logo-area']}>
        <img 
          onClick={toHomePage}
          src='https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png' 
        />
        <span  onClick={toBooklet} className={styles['logo-area-title']}>{booklet.name}</span>
      </div>
    </div>
  );
};

export default Header;