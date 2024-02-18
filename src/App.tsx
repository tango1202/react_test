import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyDiv from './MyDiv'; // 불러오기 합니다.
import MyVal from './MyVal';
import MyUserList from './MyUserList';
import MyButton from './MyButton';
import MyState1 from './MyState';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>안녕하세요.반가워욘</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MyDiv />
        <MyDiv />
        <MyDiv />
        <MyVal />
        <MyUserList />
        <MyButton />
        <MyState1 />
      </header>
    </div>
  );
}

export default App;
