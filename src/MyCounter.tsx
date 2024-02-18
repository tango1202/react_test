import { useState } from 'react';

// 버튼은 caption과 onClick 이벤트 핸들러를 사용합니다.
interface IMyButtonProps {
  caption: string;
  onClick(): void;
}
const MyButton = (props: IMyButtonProps) => {
  const { caption, onClick } = props;
  return <button onClick={onClick}>{caption}</button>;
};

// 값을 출력합니다. value가 변경되면 다시 렌더링 합니다.
interface IMyValueProps {
  value: number;
}
const MyValue = (props: IMyValueProps) => {
  const { value } = props;
  return <div>{value}</div>;
};

// 버튼 클릭시 value를 수정합니다. 하위 컴포넌트를 다시 랜더링 합니다.
const MyCounter = () => {
  const [value, setValue] = useState(0);

  function onMinusClick() {
    setValue(value - 1);
  }
  function onPlusClick() {
    setValue(value + 1);
  }

  return (
    <>
      <MyButton caption={'-'} onClick={onMinusClick} />
      <MyValue value={value} />
      <MyButton caption={'+'} onClick={onPlusClick} />
    </>
  );
};
export default MyCounter;
