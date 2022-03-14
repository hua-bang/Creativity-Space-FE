import { Button } from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';
import React from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

const HomeBtn = () => {

  const navigate = useNavigate();

  const toHomePage = () => {
    navigate('/home/content');
  };

  return (
    <div className={styles['home-btn']} onClick={toHomePage}>
      <Button 
        style={{ width: '40px', height: '40px', background: 'white' }} shape='circle' 
        icon={<IconHome fontSize={18} />} />
    </div>
  );
};

export default HomeBtn;