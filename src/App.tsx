import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BackTop } from '@arco-design/web-react';
import routes from './router/index';
import Nav from './components/Nav';
import { getUserInfo } from '@/api/user';
import useStore from '@/hooks/useStore';
import './App.css';
import AuthWrapper from './components/Auth/AuthWrapper';
import HomeBtn from './components/Home-Btn';

function App() {

  const { userStore } = useStore();

  const loadUser = () => {
    getUserInfo().then(res => {
      const user = res.data;
      userStore.setUser(user, user.roles);
    }).catch(console.warn);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <Nav />
      <div className='element-container'>
        {
          <Routes>
            {
              routes.map((route) => {
                const { auth, path, element, redirectPath } = route;

                return (
                  <Route 
                    key={path}
                    path={path}
                    element={
                      auth 
                        ? (
                          <AuthWrapper key={path} auth={auth} redirectPath={redirectPath}>
                            {element}
                          </AuthWrapper>
                        ) :
                        element
                    }
                  />
                );
              })
            }
          </Routes>
          
        }
        
      </div>
      <BackTop
        visibleHeight={30}
        style={{
          position: 'fixed',
          right: '60px'
        }}
      />
      <HomeBtn />
    </>
  );
}

export default App;
