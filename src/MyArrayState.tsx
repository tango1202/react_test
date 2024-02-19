import { useState } from 'react'; 

const MyArrayState = () => {
  const [arr, setArr] = useState([1, 2, 3]); 
  function onElementClick() {
    arr[0] = 10;
    setArr(arr); // #1. 렌더링을 다시 하지 않습니다.
  }
  function onArrayClick() {
    setArr([20, arr[1], arr[2]]); // #2. 렌더링을 다시 합니다.
  }
  return (
    <div>
      <button onClick={onElementClick}>각 요소값을 변경합니다.</button>
      <button onClick={onArrayClick}>array를 변경합니다.</button>
      <p>
        arr[0] = {arr[0]} arr[1] = {arr[1]} arr[2] = {arr[2]}
      </p>
    </div>
  );
};
export default MyArrayState;
