import { useState } from 'react';

interface IProps { // #1.
  value: number;
  onMinusClick(): void;
  onPlusClick(): void;
}

const MyCounter = (props: IProps) => {
  return (
    <>
      <button onClick={props.onMinusClick}>{'-'}</button> {/* #3. Props에 전달된 콜백 함수를 호출합니다. */}
      <span>{props.value}</span> {/* #2. value를 표시합니다. */}
      <button onClick={props.onPlusClick}>{'+'}</button> {/* #3. Props에 전달된 콜백 함수를 호출합니다. */}
    </>
  );
};

const MyCounterCallback = () => {
  const [value, setValue] = useState(0);

  const onResetClick = () => {
    setValue(0); // #5. 0으로 리셋하고 다시 렌더링합니다.
  };
  const onMinusClick = () => {
    setValue(value - 1); // #4. State를 수정합니다.
  };
  const onPlusClick = () => {
    setValue(value + 1); // #4. State를 수정합니다.
  };

  return (
    <div>
      <button onClick={onResetClick}>{'0으로 리셋합니다.'}</button>
      <MyCounter value={value} onMinusClick={onMinusClick} onPlusClick={onPlusClick} />
    </div>
  );
};

export default MyCounterCallback;
