import { useState } from 'react'; // #1

const MyState = () => {
  const [stateCount, setStateCount] = useState(0); // #2
  // const [stateCount, setStateCount] = useState<number>(0); // useState<타입>으로 타입을 명시할 수 있습니다.
  let count = 0;
  console.log('MyState 이 호출되었습니다.');
  function onClick() {
    ++count;
    // ++stateCount; // #3. state는 setter를 이용해서 수정해야만 랜더링을 다시 합니다.
    setStateCount(stateCount + 1);
    alert(`버튼을 ${count}회 클릭했습니다.`);
  }

  return (
    <div>
      <button onClick={onClick}>카운트합니다.</button>
      <p>
        {/* #4. count는 변하지 않고, stateCount는 변합니다. */}
        count = {count} stateCount = {stateCount}
      </p>
    </div>
  );
};
export default MyState;
