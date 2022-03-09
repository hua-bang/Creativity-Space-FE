import React, { useContext } from 'react';
import storeContext from '../stores';
export const useStore = () => useContext(storeContext);
