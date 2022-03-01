import React from 'react';
import logo from './logo.svg';
import useCounter from './hooks/useCounter';
import './App.css';

function App() {

  const [count, add] = useCounter(2);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello <code>Creativity Space</code> { count }.
        </p>
        <button onClick={add}>
          add
        </button>
      </header>
    </div>
  );
}

export default App;
