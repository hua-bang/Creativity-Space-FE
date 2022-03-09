import React, { useState } from 'react';
import styles from './index.module.scss';
import Login from './Login';
import Register from './Register';

const FormArea = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggle = () => {
    setIsLogin(prev => !prev);
  };

  return (
    <div className={styles['form-area']}>
      {
        isLogin ? <Login toggle={toggle} /> : <Register toggle={toggle} />
      }
    </div>
  );
};

export default FormArea;