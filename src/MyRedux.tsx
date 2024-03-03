import { useRef, useCallback } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { Action, Dispatch } from "redux";

// #1. redux store 에서 사용할 데이터 정보입니다.
interface IData {
  name: string;
  age: number;
}
interface IState {
  datas: IData[];
}

// #2. redux store 의 초기값입니다. 빈 배열입니다.
const initialState: IState = {
  datas: [],
};

// #3. redux 에서 사용할 액션 정보입니다. 액션 타입에 따라 동작을 구분합니다.
// useReducer() 와의 차이점 : redux의 액션 type은 문자열만 가능합니다.
type ActionType = 'Create' | 'Update' | 'Delete';
interface IAction extends Action<ActionType> { 
  data: IData; // #3-1. 액션 타입에 따라 전달된 data를 이용하여 state를 수정합니다.
}

// #4. ActionType에 따라 state의 값을 수정합니다. 이때, State의 경우와 마찬가지로 복제본을 리턴해야 다시 렌더링 됩니다.
// State를 수정하는 기능들이 한곳에 응집되어 관리가 용이해 집니다.
// useReducer() 와의 차이점 : state 기본값 인자로 초기값을 전달해야 합니다.
const datasReducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case 'Create': // datas 뒤에 새로운 action.data를 추가하여 리턴합니다.
      return {
        ...state,
        datas: [...state.datas, action.data],
      };
    case 'Update': // datas에서 이름이 동일한 항목을 수정하여 리턴합니다.
      return {
        ...state,
        datas: state.datas.map((data) => (data.name !== action.data.name ? data : action.data)),
      };
    case 'Delete': // datas에서 이름이 동일한 항목을 삭제합니다.
      return {
        ...state,
        datas: state.datas.filter((data) => data.name !== action.data.name),
      };
    default:
      return state;
  }
};

// #5. 사용자 정보를 입력받는 Toolbar와 해당 내용을 출력하는 List를 표시합니다.
const MyRedux = () => {
  // #6. redux의 store 개체를 생성합니다. reducer 속성을 설정합니다. 
  const store = configureStore({ 
    reducer: datasReducer, 
    preloadedState : initialState
  });

   return (
    <div>
      {/* #6-1. 생성된 store를 Provider에 전달합니다. */}
      <Provider store={store}>
        <MyToolbar />
        <MyList />
      </Provider>
    </div>
  );
};

// #7. UI를 이용하여 정보를 읽고 redux 액션을 실행합니다.
// useReducer() 와의 차이점 : 각 컴포넌트에서 redux를 이용하므로 Props를 사용할 필요가 없습니다.
const MyToolbar = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch<IAction>>(); // #7-1. redux 액션을 실행하기 위해 dispatch를 구합니다.

  // #7-2. 불필요한 함수 생성을 최소화하도록 useCallback을 사용합니다.
  const createAction = useCallback((type: ActionType, name: string, age: number): IAction => {
    return {
      type,
      data: { name, age },
    };
  }, []);
  // #7-3. 입력 개체의 정보를 바탕으로 Action을 만든뒤 datasReducer()를 호출하여 액션을 실행합니다.
  const onCreate = () => {
    dispatch(createAction('Create', nameRef.current ? nameRef.current.value : '', ageRef.current ? Number(ageRef.current.value) : 0));
  };
  const onUpdate = () => {
    dispatch(createAction('Update', nameRef.current ? nameRef.current.value : '', ageRef.current ? Number(ageRef.current.value) : 0));
  };
  const onDelete = () => {
    dispatch(createAction('Delete', nameRef.current ? nameRef.current.value : '', ageRef.current ? Number(ageRef.current.value) : 0));
  };
  return (
    <div>
      <span>{'이름'}</span>
      <input ref={nameRef} />
      <span>{'나이'}</span>
      <input ref={ageRef} />
      <button onClick={onCreate}>{'Create'}</button>
      <button onClick={onUpdate}>{'Update'}</button>
      <button onClick={onDelete}>{'Delete'}</button>
    </div>
  );
};

// #8. datas를 출력합니다.
// useReducer() 와의 차이점 : 각 컴포넌트에서 redux를 이용하므로 Props를 사용할 필요가 없습니다.
const MyList = () => {
  // #8-1. useSelector()를 이용하여 store에 있는 값을 읽어옵니다.
  const datas = useSelector<IState, IData[]>((state) => state.datas);
  return (
    <ol>
      {datas.map((data) => (
        <li key={data.name}> {/* #8-2. 목록형으로 출력하므로 key를 사용합니다. */}
          {data.name} {', '} {data.age}
        </li>
      ))}
    </ol>
  );
};

export default MyRedux;
