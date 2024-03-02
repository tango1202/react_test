import { useState, useCallback } from 'react';

const MyUseCallback = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [result, setResult] = useState(0);

  const add = () => {
    setResult(a + b); // #1
  };

  const onAddClick = add; // #3
  const onEmptyClick = useCallback(add,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []); // #4
  const onACallbackClick = useCallback(add,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [a]); // #5
  const onABCallbackClick = useCallback(add, [a, b]); // #6

  const onStateClick = () => {
    setA(a + 1); // #2
  };
  const onValueClick = () => {
    setB(b + 1); // #2
  };

  return (
    <div>
      <button onClick={onStateClick}>{`a = ${a} 를 증가`}</button>
      <button onClick={onValueClick}>{`b = ${b} 를 증가`}</button>
      <button onClick={onAddClick}>{`매 렌더링시 함수 생성. ${result}`}</button>
      <button onClick={onEmptyClick}>{`최초 1회 함수 생성. ${result}`}</button>
      <button onClick={onACallbackClick}>{`a 변경시 함수 생성. ${result}`}</button>
      <button onClick={onABCallbackClick}>{`a, b 변경시 함수 생성. ${result}`}</button>
    </div>
  );
};

export default MyUseCallback;
