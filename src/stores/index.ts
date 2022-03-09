import React from 'react';
import CounterStore from './count';

const storesContext = React.createContext({
  counterStore: new CounterStore()
});

export default storesContext;