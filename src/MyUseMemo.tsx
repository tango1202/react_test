import { useState, useMemo } from 'react';

const MyUseMemo = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const add = () => a + b; // #1
  const emptyMemo = useMemo(add, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []); // #3
  const aMemo = useMemo(add, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [a]); // #4
  const abMemo = useMemo(add, [a, b]); // #5

  const onStateClick = () => {
    setA(a + 1); // #2
  };
  const onValueClick = () => {
    setB(b + 1); // #2
  };
  return (
    <div>
      <button onClick={onStateClick}>{`a = ${a} 를 증가시키고 렌더링을 다시 합니다.`}</button>
      <button onClick={onValueClick}>{`b = ${b} 를 증가시키고 렌더링을 다시 합니다.`}</button>
      <div>{`매 렌더링시 호출. inc ${add()}`}</div>
      <div>{`최초에 1회 호출. useMemo[] ${emptyMemo}`}</div>
      <div>{`a 변경시 호출. useMemo[a] ${aMemo}`}</div>
      <div>{`a, b 변경시 호출. useMemo[a, b] ${abMemo}`}</div>
    </div>
  );
};

export default MyUseMemo;
