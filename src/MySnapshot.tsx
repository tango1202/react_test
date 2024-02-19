import { useState } from 'react';

const MySnapshot = () => {
  const [stateCount, setStateCount] = useState(0);
  // #1. 1이 증가됩니다. 
  function onPlusOneClick() {
    setStateCount(stateCount + 1);
  }
  // #2. 1이 증가됩니다.
  function onPlusThreeClick() {
    // setStateCount(stateCount + 1); 후 즉각 stateCount의 값을 바꾸지 않습니다.
    setStateCount(stateCount + 1); // #2-1. setStateCount(0 + 1) 실행
    setStateCount(stateCount + 1); // #2-2. 여전히 stateCount는 0. setStateCount(0 + 1) 실행
    setStateCount(stateCount + 1); // #2-3. 여전히 stateCount는 0. setStateCount(0 + 1) 실행
  }
  // #3. 3이 증가됩니다.
  function onPlusThreeFuncClick() {
    // 대기열에 상태 변경 함수 3개가 등록됩니다.
    setStateCount((s) => s + 1); // 대기열에 상태 변경 함수 추가
    setStateCount((s) => s + 1); // 대기열에 상태 변경 함수 추가
    setStateCount((s) => s + 1); // 대기열에 상태 변경 함수 추가
  }
  return (
    <div>
      <button onClick={onPlusOneClick}>+1</button>
      <button onClick={onPlusThreeClick}>+3</button>
      <button onClick={onPlusThreeFuncClick}>+3 with Func</button>
      <p>stateCount = {stateCount}</p>
    </div>
  );
};
export default MySnapshot;
