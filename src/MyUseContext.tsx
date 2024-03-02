import { useState, createContext, useContext } from 'react';

interface IMyThemeContext { // #1. 공유해서 사용할 저장소 인터페이스 입니다. 
  isDark: boolean;
  setIsDark?(isDark: boolean): void;
}
const MyThemeContext = createContext<IMyThemeContext>({ isDark: false}); // #2. 저장소를 생성합니다. 기본값을 전달합니다.

const MyUseContext = () => {
  const [isDark, setIsDark] = useState(false); // #3-1
  const onClick = () => { 
    setIsDark(!isDark); // #6. MyThemeContext의 값을 수정합니다.
  };
  return (
    <div>
      <button onClick={onClick}>{'다크 모드 토글'}</button>
      <MyThemeContext.Provider value={{ isDark: isDark, setIsDark: setIsDark }}> {/* #3. Provider 하위의 모든 개체에 전달할 값을 설정합니다. */}
        <MyToolbar />
      </MyThemeContext.Provider>
    </div>
  );
};

const MyToolbar = () => {
  const { isDark, setIsDark } = useContext<IMyThemeContext>(MyThemeContext); // #4. MyThemeContext의 값을 사용합니다.

  const onClick = () => {
    if (setIsDark !== undefined) {
      setIsDark(!isDark); // #6. MyThemeContext의 값을 수정합니다.
    }
  };
  return (
    <div
      style={{ // #5. MyThemeContext 값에 따라 스타일을 바꿉니다.
        backgroundColor: isDark ? 'black' : 'white',
      }}
    >
      <span
        style={{ // #5. MyThemeContext 값에 따라 스타일을 바꿉니다.
          backgroundColor: isDark ? 'black' : 'white',
          color: isDark ? 'white' : 'black',
        }}
      >
        {'툴바 :'}
      </span>
      <MyButton caption={'버튼1'} />
      <MyButton caption={'하위 컴포넌트에서 다크 모드 토글'} onClick={onClick} />
      <MyButton caption={'버튼1'} />
    </div>
  );
};

interface IProps {
  caption: string;
  onClick?(): void;
}
const MyButton = (props: IProps) => {
  const { isDark } = useContext<IMyThemeContext>(MyThemeContext); // #4. MyThemeContext의 값을 사용합니다.
  return (
    <button
      onClick={props.onClick}
      style={{ // #5. MyThemeContext 값에 따라 스타일을 바꿉니다.
        backgroundColor: isDark ? 'black' : 'white',
        color: isDark ? 'white' : 'black',
      }}
    >
      {props.caption}
    </button>
  );
};

export default MyUseContext;
