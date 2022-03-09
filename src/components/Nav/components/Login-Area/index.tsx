import React from 'react';
import styles from './index.module.scss';
import { Button } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../../hooks/userStore';

const LoginArea = () => {

  const { counterStore } = useStore();

  const navigate = useNavigate();
  
  const toLogin = () => {
    console.log('login');
    navigate('/login');
  };

  const signUp = () => {
    console.log('signUp');
  };

  return (
    <div className={styles['login-area']}>
      <div className={styles['login-btn']} onClick= {toLogin}>
        Log in
      </div>
      <div className={styles['register-btn']}>
        <Button type="primary" onClick={signUp}>
          Create Account
          {counterStore.count}
        </Button>
      </div>
    </div>
  );
};

export default LoginArea;