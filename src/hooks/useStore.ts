import React, { useContext } from 'react';
import storeContext from '../stores';
const useStore = () => useContext(storeContext);

export default useStore;