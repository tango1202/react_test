import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyDiv from './MyDiv'; // 불러오기 합니다.
import MyVal from './MyVal';
import MyUserList from './MyUserList';
import MyButton from './MyButton';
import MyState from './MyState';
import MyArrayState from './MyArrayState';
import MyProps from './MyProps';
import MyPropsState from './MyPropsState';
import MyCounterCallback from './MyCounterCallback';
import MySnapshot from './MySnapshot';
import MyUseEffect from './MyUseEffect';
import MyUseEffectUnmount from './MyUseEffectUnmount';
import MyUseMemo from './MyUseMemo';
import MyUseCallback from './MyUseCallback';
import MyUseRef from './MyUseRef';
import MyUseRefFocus from './MyUseRefFocus';
import MyUseRefCustom from './MyUseRefCustom';
import MyUseContext from './MyUseContext';
import MyUseReducer from './MyUseReducer';
import MyUseCounter from './MyUseCounter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>안녕하세요.반가워요</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <MyDiv />
        <MyDiv />
        <MyDiv />
        <MyVal />
        <MyUserList />
        <MyButton />
        <MyState />
        <MyArrayState />
        <MyProps />
        <MyPropsState />
        <MyCounterCallback />
        <MySnapshot />
        <MyUseEffect />
        <MyUseEffectUnmount />
        <MyUseMemo />
        <MyUseCallback />
        <MyUseRef />
        <MyUseRefFocus />
        <MyUseRefCustom />
        <MyUseContext />
        <MyUseReducer />
        <MyUseCounter />
      </header>
    </div>
  );
}

export default App;
