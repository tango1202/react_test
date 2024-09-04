import { useState } from 'react';

interface IProps {
  init: number;
}

const MyCounter = (props: IProps) => {
  const { init } = props;
  const [value, setValue] = useState(init); // #1. Props를 State의 초기값으로 사용합니다.

  const onMinusClick = () => {
    setValue(value - 1); // #2. State를 수정합니다.
  };
  const onPlusClick = () => {
    setValue(value + 1); // #2. State를 수정합니다.
  };
  return (
    <>
      <button onClick={onMinusClick}>{'-'}</button>
      <span>{value}</span> {/* #3. State를 표시합니다. */}
      <button onClick={onPlusClick}>{'+'}</button>
    </>
  );
};

const MyPropsState = () => {
  const [value, setValue] = useState(0);

  const onResetClick = () => {
    setValue(0); // #4. MyCounter의 0으로 리셋하고 다시 렌더링합니다. 하지만, State의 초기값은 함수를 처음 실행할 때만 적용됩니다.
  };

  return (
    <div>
      <button onClick={onResetClick}>{'MyCounter의 State는 0으로 리셋이 안됩니다.'}</button>
      <MyCounter init={value} />
    </div>
  );
};
export default MyPropsState;
