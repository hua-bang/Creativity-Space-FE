import React from 'react';
import styles from './index.module.scss';
import { Button } from '@arco-design/web-react';
import useLogin from '@/hooks/useLogin';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const LoginTip = () => {

  const isLogin = useLogin();

  const navigate = useNavigate();

  return (
    <div className={styles['login-tip']}>
      <div className={styles['main-text']}>
        <span>Creativity Space</span> is a community of many amazing develops
      </div>
      <div className={styles['description-text']}>
        We are a place where coders share, stay up-to-date and grow their careers.
      </div>
      {
        !isLogin ? (
          <>
            <div className={styles['btn-area']}>
              <Button 
                type="primary"
                style={{
                  width: '100%'
                }}
                onClick={ () => { navigate('/login?type=register'); }}
              >
              Create Account
              </Button>
            </div>
            <div 
              className={styles['login-area']}
              onClick={ () => { navigate('/login'); }}
            >
              Log in
            </div>
          </>
        ) :
          (
            <div className={styles['btn-area']}>
              <Button 
                type="primary"
                style={{
                  width: '100%'
                }}
                onClick={ () => { navigate('/editor'); }}
              >
              Create Post
              </Button>
            </div>
          )
      }
    </div>
  );
};

export default observer(LoginTip);