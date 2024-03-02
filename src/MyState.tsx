import { useState } from 'react'; // #1

const MyState = () => {
  let count = 0; // 일반 변수 입니다. 수정해도 JSX에 반영되지 않습니다.

  const [countState, setCountState] = useState(0); // #2
  // const [countState, setCountState] = useState<number>(0); // useState<타입>으로 타입을 명시할 수 있습니다.

  console.log('MyState 이 호출되었습니다.');
  const onClick = () => {
    ++count; // 수정해도 JSX에 반영되지 않습니다.
    // ++countState; // #3. state는 setter를 이용해서 수정해야만 렌더링을 다시 합니다.
    setCountState(countState + 1);
    alert(`버튼을 ${count}회 클릭했습니다.`);
  };

  return (
    <div>
      <button onClick={onClick}>카운트합니다.</button>
      <p>
        {/* #4. count는 변하지 않고, countState는 변합니다. */}
        count = {count} countState = {countState}
      </p>
    </div>
  );
};
export default MyState;
