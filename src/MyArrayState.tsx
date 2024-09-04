import { useState } from 'react';

const MyArrayState = () => {
  const [arr, setArr] = useState([
    { x: 1, y: 2 },
    { x: 10, y: 20 },
  ]);
  const onXClick = () => {
    arr[0].x = 100;
    setArr(arr); // #1. 렌더링을 다시 하지 않습니다.
  };
  const onElementClick = () => {
    arr[0] = { x: 100, y: 2 };
    setArr(arr); // #2. 렌더링을 다시 하지 않습니다.
  };
  const onArrayClick = () => {
    const clone = [...arr];
    clone[0].x = 100; // #3. 복제본을 수정합니다.
    console.log(arr !== clone); // #3-1. 배열은 복제했으므로 다른 개체입니다.
    console.log(arr[0].x === clone[0].x); // #3-2. 배열의 각 요소는 앝은 복사됩니다.
    
    setArr(clone); // #4. 렌더링을 다시 합니다.
  };
  return (
    <div>
      <button onClick={onXClick}>x 값을 변경합니다.</button>
      <button onClick={onElementClick}>arr[0]을 변경합니다.</button>
      <button onClick={onArrayClick}>arr을 변경합니다.</button>
      <p>{`arr[0] : ${arr[0].x}, ${arr[0].y} arr[1] : ${arr[1].x}, ${arr[1].y}}`}</p>
    </div>
  );
};
export default MyArrayState;
