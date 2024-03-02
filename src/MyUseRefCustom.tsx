import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

const MyUseRefCustom = () => {
  const myCounterRef = useRef<IMyCounterRef>(null); // #1

  const onRefClick = () => {
    console.log(30);
    if (myCounterRef.current !== null) {
      myCounterRef.current.setValueFunc(30); // #6
    }
  };

  return (
    <div>
      <button onClick={onRefClick}>{'ref를 이용하여 30으로 세팅합니다.'}</button>
      <MyCounter ref={myCounterRef} /> {/* #1-1 */}
    </div>
  );
};

// #2. 외부로 노출할 함수들로 구성된 인터페이스입니다.
interface IMyCounterRef {
  setValueFunc(val: number): void;
}
// #3. forwardRef를 이용해서 외부에서 ref 속성을 사용할 수 있게 합니다.
const MyCounter = forwardRef<IMyCounterRef>((props, ref) => {
  const [value, setValue] = useState(0);

  // #4. 외부에서 실행할 함수입니다. setValue()를 이용하여 State를 수정합니다.
  const setValueFunc = (val: number): void => setValue(val);

  // #5. 외부에 노출할 함수들을 모아 개체로 리턴합니다.
  useImperativeHandle(ref, (): IMyCounterRef => {
    return {
      setValueFunc,
    };
  });
  const onMinusClick = () => {
    setValue(value - 1);
  };
  const onPlusClick = () => {
    setValue(value + 1);
  };

  return (
    <>
      <button onClick={onMinusClick}>{'-'}</button>
      <span>{value}</span>
      <button onClick={onPlusClick}>{'+'}</button>
    </>
  );
});

export default MyUseRefCustom;
