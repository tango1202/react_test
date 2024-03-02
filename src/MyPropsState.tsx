import { useState } from 'react';

interface IProps {
  init: number;
}

const MyCounter = (props: IProps) => {
  const { init } = props;
  const [value, setValue] = useState(init); // #1. Props를 State에 복제합니다.

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
    setValue(0); // #4. MyCounter의 0으로 리셋하고 다시 렌더링합니다. 하지만, MyCounter가 초기에 전달한 값을 복제해서 사용하는 바람에 0으로 리셋이 안됩니다.
  };

  return (
    <div>
      <button onClick={onResetClick}>{'MyCounter가 초기에 전달한 값을 복제해서 사용하는 바람에 0으로 리셋이 안됩니다.'}</button>
      <MyCounter init={value} />
    </div>
  );
};
export default MyPropsState;
