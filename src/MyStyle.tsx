
import { useMemo } from 'react';
import './MyStyle.css';
import styles from './MyStyle.module.css'; // #1. 모듈 형태로 import 합니다.
import styled from "styled-components"; 

const MyInlineStyle = () => {
  return (
    <div style = {
      { // React.CSSProperties 를 사용합니다.
        backgroundColor: 'red'
      }
    }>
      {'인라인 스타일입니다.'}
    </div>
  );
};
const MyVarInlineStyle = () => {
  const style = useMemo(() => { // 최초 실행될때 리턴한 값을 재사용합니다.
    return {
      backgroundColor: 'green'
    };
  }, []); 
  return (
    <div style = {style}>
      {'변수를 이용한 인라인 스타일입니다.'}
    </div>
  );
};
const MyCssStyle = () => {
  return (
    <div className = {'my-style'}>
      {'css를 import 했습니다.'}
    </div>
  );
};
const MyCssModuleStyle = () => {
  return (
    // #2. style.css클래스명 으로 접근할 수 있습니다. 
    // css클래스명에 - 와 같이 자바스크립트 변수명으로 사용할 수 없는 문자를 사용했다면,
    // [css클래스명]와 같이 []로 표현할 수 있습니다.
    <div className = {styles['my-style']}>
      {'css를 모듈로 import 했습니다.'}
    </div>
  );
};

// HTML 엘리먼트에 스타일 적용
const MyDiv = styled.div` 
  background-color: brown;
`;

const MyStyled = () => {
  return (
    <MyDiv>
      {'styled를 사용 했습니다.'}
    </MyDiv>
  );
};
const MyStyle = () => {
  return (
    <div>
      <MyInlineStyle/>
      <MyVarInlineStyle/>
      <MyCssStyle/>
      <MyCssModuleStyle/>
      <MyStyled/>
    </div>
  );
};

export default MyStyle; 
