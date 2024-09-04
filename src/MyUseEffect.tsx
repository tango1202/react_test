import { useState, useEffect } from 'react';

const MyUseEffect = () => {
  const [propVal, setPropVal] = useState(0);

  const onClick = () => {
    setPropVal(propVal + 1); // #1. propVal을 변경합니다. MyComponent 가 다시 렌더링됩니다.
  };

  return (
    <>
      <button onClick={onClick}>{'value 변경'}</button>
      <MyComponent propVal={propVal} />
    </>
  );
};

interface IMyComponentProps {
  propVal: number;
}

const MyComponent = (props: IMyComponentProps) => {
  const { propVal } = props;
  const [state, setState] = useState(0);

  useEffect(() => console.log(`propVal = ${propVal}, state = ${state}, 인자 없음. 렌더링 호출시마다 실행`));
  useEffect(() => console.log(`propVal = ${propVal}, state = ${state}, []. 최초에 1회 실행`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
  useEffect(() => console.log(`propVal = ${propVal}, state = ${state}, [propVal]. Props가 바뀌면 실행`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [propVal]);
  useEffect(() => console.log(`propVal = ${propVal}, state = ${state}, [state]. State가 바뀌면 실행`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]);
  useEffect(() => console.log(`propVal = ${propVal}, state = ${state}, [propVal, state]. Props와 State가 바뀌면 실행.`), 
    [propVal, state]);

  const onClick = () => {
    setState(state + 1); // #2. state를 변경합니다. MyComponent 가 다시 렌더링됩니다.
  };
  return (
    <div>
      <button onClick={onClick}>{'state 변경'}</button>
      <div>{`propVal = ${propVal}, state = ${state}`}</div>
    </div>
  );
};

export default MyUseEffect;
