import React from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';


const LoginArea = () => {
  return (
    <div className={styles['login-area']}>
      <div className={styles['login-btn']}>
        Log in
      </div>
      <div className={styles['register-btn']}>
        <Button type="primary" ghost>
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default LoginArea;