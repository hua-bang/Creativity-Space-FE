import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../hooks/userStore';

const HomePage = () => {
  const store = useStore();
  const { counterStore } = store;

  const handleIncrease = () => {
    counterStore.increase();
  };
  const handleDecrease = () => {
    counterStore.decrease();
  };
  const handleTest = () => {
    counterStore.test(12);
  };

  return (
    <div>
      <p>count:{counterStore.count}</p>
      <button onClick={handleIncrease}>add</button>
      <button onClick={handleDecrease}>minus</button>
      <button onClick={handleTest}>handleTest</button>
      <p>doubleCount:{counterStore.doubleCount}</p>
    </div>
  );
};

export default observer(HomePage);