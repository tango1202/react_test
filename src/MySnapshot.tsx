import { useState } from 'react';

const MySnapshot = () => {
  const [countState, setCountState] = useState(0);
  // #1. 1이 증가됩니다.
  const onPlusOneClick = () => {
    setCountState(countState + 1);
  };
  // #2. 1이 증가됩니다.
  const onPlusThreeClick = () => {
    // setCountState(countState + 1); 후 즉각 countState의 값을 바꾸지 않습니다.
    setCountState(countState + 1); // #2-1. setCountState(0 + 1) 실행
    setCountState(countState + 1); // #2-2. 여전히 countState는 0. setCountState(0 + 1) 실행
    setCountState(countState + 1); // #2-3. 여전히 countState는 0. setCountState(0 + 1) 실행
  };
  // #3. 3이 증가됩니다.
  const onPlusThreeFuncClick = () => {
    // 대기열에 상태 변경 함수 3개가 등록됩니다.
    setCountState((prevState) => prevState + 1); // 대기열에 상태 변경 함수 추가
    setCountState((prevState) => prevState + 1); // 대기열에 상태 변경 함수 추가
    setCountState((prevState) => prevState + 1); // 대기열에 상태 변경 함수 추가
  };
  return (
    <div>
      <button onClick={onPlusOneClick}>+1</button>
      <button onClick={onPlusThreeClick}>+3</button>
      <button onClick={onPlusThreeFuncClick}>+3 with Func</button>
      <p>countState = {countState}</p>
    </div>
  );
};
export default MySnapshot;
