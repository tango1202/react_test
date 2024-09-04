import { useState, useEffect } from 'react';

const MyUseEffectUnmount = () => {
  const [toggle, setToggle] = useState(true); // #1.

  const onToggleClick = () => {
    setToggle(!toggle); // #1. 컴포넌트를 표시 삭제를 토글합니다.
  };

  return (
    <>
      <button onClick={onToggleClick}>{'컴포넌트 추가/삭제 토글'}</button>
      {toggle && <MyComponent />} {/* #2 */}
    </>
  );
};

const MyComponent = () => {

  useEffect(() => {
    return (
      () => { // #3
        console.log('MyComponent가 삭제됩니다.');
      }
    ); 
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  return (
    <div>{'토글버튼을 클릭하면 표시되거나 삭제됩니다.'}</div>
  );
};

export default MyUseEffectUnmount;