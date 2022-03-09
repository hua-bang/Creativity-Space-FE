import React from 'react';
import { useRoutes } from 'react-router-dom';
import { BackTop } from '@arco-design/web-react';
import routes from './router/index';
import Nav from './components/Nav';
import './App.css';

function App() {
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
