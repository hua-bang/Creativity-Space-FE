import React from 'react';
import styles from './index.module.scss';
import { Button } from '@arco-design/web-react';

const LoginTip = () => {
  return (
    <div className={styles['login-tip']}>
      <div className={styles['main-text']}>
        <span>Creativity Space</span> is a community of many amazing develops
      </div>
      <div className={styles['description-text']}>
        We are a place where coders share, stay up-to-date and grow their careers.
      </div>
      <div className={styles['btn-area']}>
        <Button 
          type="primary"
          style={{
            width: '100%'
          }}
        >
          Create Account
        </Button>
      </div>
      <div className={styles['login-area']}>
        Log in
      </div>
    </div>
  );
};

export default LoginTip;