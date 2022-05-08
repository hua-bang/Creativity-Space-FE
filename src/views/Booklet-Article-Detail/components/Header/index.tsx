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
          className={styles['logo']}
          onClick={toHomePage}
          src='https://cos-1258926018.cos.ap-guangzhou.myqcloud.com/common-file%2F%E6%AF%95%E8%AE%BE-Logo.drawio%20(1).png' 
        />
        <span  onClick={toBooklet} className={styles['logo-area-title']}>{booklet.name}</span>
      </div>
    </div>
  );
};

export default Header;