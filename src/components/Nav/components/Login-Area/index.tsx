import React from 'react';
import styles from './index.module.scss';
import { Button } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';

const LoginArea = () => {

  const navigate = useNavigate();
  
  const toLogin = () => {
    navigate('/login');
  };

  const signUp = () => {
    navigate('/login?type=register');
  };

  return (
    <div className={styles['login-area']}>
      <div className={styles['login-btn']} onClick= {toLogin}>
        Log in
      </div>
      <div className={styles['register-btn']}>
        <Button type="primary" onClick={signUp}>
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default LoginArea;