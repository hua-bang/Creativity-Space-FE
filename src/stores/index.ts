import React from 'react';
import CounterStore from './count';
import UserStore from './user';

const storesContext = React.createContext({
  counterStore: new CounterStore(),
  userStore: new UserStore()
});

export default storesContext;