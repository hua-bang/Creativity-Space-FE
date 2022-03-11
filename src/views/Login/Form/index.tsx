import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Login from './Login';
import Register from './Register';
import useSearchParamByKey from '@/hooks/useSearchParamByKey';

enum FormType {
  LOGIN = 'login',
  REGISTER = 'register'
}

const isLoginType = (type: string) => type === FormType.LOGIN; 

const FormArea = () => {

  const type = useSearchParamByKey('type');
  const [isLogin, setIsLogin] = useState(() => isLoginType(type || 'login'));


  useEffect(() => {
    setIsLogin(isLoginType(type || 'login'));
  }, [type]);

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