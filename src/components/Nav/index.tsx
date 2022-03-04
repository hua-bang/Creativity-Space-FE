import React from 'react';
import './index.scss';
import SearchArea from './components/Search-Area';
import LoginArea from './components/Login-Area';

function Nav() {

  return (
    <div className='creativity-header__container'>
      <div className='left-container'>
        <SearchArea />
      </div>
      <div className='right-container'>
        <LoginArea />
      </div>
    </div>
  );
}

export default Nav;