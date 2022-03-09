import React from 'react';
import styles from './index.module.scss';
import FormArea from './Form';

const Login = () => {
  console.log('login');

  return (
    <div className={styles['login-page']}>
      <div className={styles['description-area']}>
        <h1>Welcome to Creativity Space</h1>
        <p>
          <a>Creativity Space</a> is a community of many amazing developers
        </p>
        <FormArea />
      </div>
    </div>
  );
};

export default Login;
