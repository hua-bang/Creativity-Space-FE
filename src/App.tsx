import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { BackTop } from '@arco-design/web-react';
import routes from './router/index';
import Nav from './components/Nav';
import { getUserInfo } from '@/api/user';
import useStore from '@/hooks/useStore';
import './App.css';

function App() {

  const { userStore } = useStore();

  const loadUser = () => {
    getUserInfo().then(res => {
      const user = res.data;
      userStore.setUser(user, user.roles);
    }).catch(err => console.log);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const elements = useRoutes(routes);
  return (
    <>
      <Nav />
      <div className='element-container'>
        {elements}
      </div>
      <BackTop
        visibleHeight={30}
        style={{
          position: 'fixed',
          right: '60px'
        }}
      />
    </>
  );
}

export default App;
