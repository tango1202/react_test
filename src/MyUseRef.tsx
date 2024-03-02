import { useState, useRef } from 'react';

const MyUseRef = () => {
  const [state, setState] = useState(0);
  const ref = useRef(0); // #1
  let value = 0; // #2-1

  const onValueClick = () => {
    value += 1; // #2-2
  };
  const onStateClick = () => {
    setState(state + 1); // #3
  };
  const onRefClick = () => {
    ref.current += 1 // #4
  };
  return (
    <div>
      <button onClick={onValueClick}>{`value = ${value} 를 증가시키고 렌더링을 다시 하지 않습니다. 렌더링 하더라도 다시 0으로 초기화 됩니다.`}</button>
      <button onClick={onStateClick}>{`state = ${state} 를 증가시키고 렌더링을 다시 합니다.`}</button>
      <button onClick={onRefClick}>{`ref = ${ref.current} 를 증가시키고 렌더링을 다시 하지 않습니다.`}</button>
    </div>
  );
};

export default MyUseRef;
