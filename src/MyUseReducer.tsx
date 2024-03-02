import { useRef, useCallback, useReducer } from 'react';

// #1. reducer에서 사용할 데이터 정보입니다.
interface IData {
  name: string;
  age: number;
}
interface IState {
  datas: IData[];
}

// #2. reducer의 초기값입니다. 빈 배열입니다.
const initialState: IState = {
  datas: [],
};

// #3. reducer에서 사용할 액션 정보입니다. 액션 타입에 따라 동작을 구분합니다.
enum ActionType {
  Create,
  Update,
  Delete,
}
interface IAction {
  type: ActionType;
  data: IData; // #3-1. 액션 타입에 따라 전달된 data를 이용하여 state를 수정합니다.
}

// #4. ActionType에 따라 state의 값을 수정합니다. 이때, State의 경우와 마찬가지로 복제본을 리턴해야 다시 렌더링 됩니다.
// State를 수정하는 기능들이 한곳에 응집되어 관리가 용이해 집니다.
const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionType.Create: // datas 뒤에 새로운 action.data를 추가하여 리턴합니다.
      return {
        ...state,
        datas: [...state.datas, action.data],
      };
    case ActionType.Update: // datas에서 이름이 동일한 항목을 수정하여 리턴합니다.
      return {
        ...state,
        datas: state.datas.map((data) => (data.name !== action.data.name ? data : action.data)),
      };
    case ActionType.Delete: // datas에서 이름이 동일한 항목을 삭제합니다.
      return {
        ...state,
        datas: state.datas.filter((data) => data.name !== action.data.name),
      };
    default:
      return state;
  }
};

// 5. 사용자 정보를 입력받는 Toolbar와 해당 내용을 출력하는 List를 표시합니다.
const MyUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState); // #5-1. reducer를 생성합니다.

  const onAction = (action: IAction) => {
    dispatch(action); // #5-2. reducer를 실행합니다.
  };
  return (
    <div>
      <MyToolbar datas={state.datas} onAction={onAction} />
      <MyList datas={state.datas} />
    </div>
  );
};

interface IMyToolbarProps {
  datas: IData[];
  onAction(action: IAction): void;
}
// 6. UI를 이용하여 정보를 읽고 Action개체를 만들어 상위 개체에 전달합니다.
const MyToolbar = (props: IMyToolbarProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  // #6-1. 불필요한 함수 생성을 최소화하도록 useCallback을 사용합니다.
  const createAction = useCallback((type: ActionType, name: string, age: number): IAction => {
    return {
      type,
      data: { name, age },
    };
  }, []);
  // #6-2. 입력 개체의 정보를 바탕으로 Action을 만든뒤 상위 개체에 전달합니다.
  const onCreate = () => {
    props.onAction(createAction(ActionType.Create, nameRef.current ? nameRef.current.value : '', ageRef.current ? Number(ageRef.current.value) : 0));
  };
  const onUpdate = () => {
    props.onAction(createAction(ActionType.Update, nameRef.current ? nameRef.current.value : '', ageRef.current ? Number(ageRef.current.value) : 0));
  };
  const onDelete = () => {
    props.onAction(createAction(ActionType.Delete, nameRef.current ? nameRef.current.value : '', ageRef.current ? Number(ageRef.current.value) : 0));
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

interface IMyListProps {
  datas: IData[];
}
// #7. datas를 출력합니다.
const MyList = (props: IMyListProps) => {
  const { datas } = props;
  return (
    <ol>
      {datas.map((data) => (
        <li key={data.name}> {/* #7-1. 목록형으로 출력하므로 key를 사용합니다. */}
          {data.name} {', '} {data.age}
        </li>
      ))}
    </ol>
  );
};

export default MyUseReducer;
