import { useState } from 'react';

const MyUseCounter = () => {
  return (
    <div>
      <MyLeftRightCounter />
      <MyTopDownCounter />
    </div>
  );
};

// const MyLeftRightCounter = () => {
//   const [value, setValue] = useState(0); // 로직이 중복됩니다.

//   const onMinusClick = () => {
//     setValue(value - 1); // 로직이 중복됩니다.
//   };
//   const onPlusClick = () => {
//     setValue(value + 1); // 로직이 중복됩니다.
//   };

//   return (
//     <>
//       <button onClick={onMinusClick}>{'-'}</button> 
//       <span>{value}</span> 
//       <button onClick={onPlusClick}>{'+'}</button> 
//     </>
//   );
// };
// const MyTopDownCounter = () => {
//   const [value, setValue] = useState(0); // 로직이 중복됩니다.

//   const onMinusClick = () => {
//     setValue(value - 1); // 로직이 중복됩니다.
//   };
//   const onPlusClick = () => {
//     setValue(value + 1); // 로직이 중복됩니다.
//   };

//   return (
//     <>
//       <div>
//         <button onClick={onMinusClick}>{'-'}</button>
//       </div>
//       <div>{value}</div> 
//       <div>
//         <button onClick={onPlusClick}>{'+'}</button> 
//       </div>
//     </>
//   );
// };

// #1. 커스텀 Hook입니다. 값을 수정할 수 있는 inc(), dec()를 리턴합니다.
const useCounter = (init:number) => {
  const [value, setValue] = useState(init); // #2
  const inc = () => {
    setValue(value + 1);
  };  
  const dec = () => {
    setValue(value - 1);
  }; 
  return {value, inc, dec}; // 로직을 구현한 State나 함수를 개체로 묶어 리턴합니다.
};

const MyLeftRightCounter = () => {
  const {value, inc, dec} = useCounter(0); // #3

  return (
    <>
      <button onClick={dec}>{'-'}</button> {/* #4. inc/dec를 바로 이벤트 핸들러로 등록하였습니다. */}
      <span>{value}</span> 
      <button onClick={inc}>{'+'}</button> {/* #4. inc/dec를 바로 이벤트 핸들러로 등록하였습니다. */} 
    </>
  );
};
const MyTopDownCounter = () => {
  const {value, inc, dec} = useCounter(0); // #3

  return (
    <>
      <div>
        <button onClick={dec}>{'-'}</button> {/* #3. inc/dec를 바로 이벤트 핸들러로 등록하였습니다. */}
      </div>
      <div>{value}</div> 
      <div>
        <button onClick={inc}>{'+'}</button> {/* #3. inc/dec를 바로 이벤트 핸들러로 등록하였습니다. */}
      </div>
    </>
  );
};

export default MyUseCounter;
