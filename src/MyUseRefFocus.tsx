import { useRef } from 'react';

const MyUseRefFocus = () => {
  const nameRef = useRef<HTMLInputElement>(null); // #1

  const onClick = () => {
    if (nameRef.current !== null) {
      nameRef.current.focus(); // #2
    }
  };

  return (
    <div>
      <input placeholder="아이디" />
      <input placeholder="이름" ref={nameRef} /> {/* #1-1 */}
      <button onClick={onClick}>{'이름에 포커스를 줍니다.'}</button>
    </div>
  );
};

export default MyUseRefFocus;
