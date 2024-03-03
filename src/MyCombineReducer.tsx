import { useRef } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Action, combineReducers } from 'redux';

// ----
// #1. 사용자 이름을 관리하는 리듀서 입니다.
// ----
interface INamesState {
  names: string[];
}

const namesInitialState: INamesState = {
  names: ['홍길동', '성춘향'],
};

type NamesActionType = 'Add' | 'Save';
interface INamesAction extends Action<NamesActionType> {
  name: string;
}
const namesReducer = (state: INamesState = namesInitialState, action: INamesAction): INamesState => {
  switch (action.type) {
    case 'Add': // #1-1. names 뒤에 새로운 action.names를 추가하여 리턴합니다.
      return {
        ...state,
        names: [...state.names, action.name],
      };
    case 'Save': // #1-2. 무언가를 저장합니다.
      console.log('이름들을 저장합니다.');
      return state;
    default:
      return state;
  }
};

// ----
// #2. 데이터가 수정되었는지 여부를 관리하는 리듀서 입니다.
// ----
interface IDirtyState {
  dirty: boolean;
}
const dirtyInitialState: IDirtyState = {
  dirty: false,
};

type DirtyActionType = 'SetDirty';
interface IDirtyAction extends Action<DirtyActionType> {
  dirty: boolean;
}

const dirtyReducer = (state: IDirtyState = dirtyInitialState, action: IDirtyAction): IDirtyState => {
  switch (action.type) {
    case 'SetDirty':
      return {
        ...state,
        dirty: action.dirty,
      };
    default:
      return state;
  }
};

// ----
// #3. 리덕스에 저장되는 형태입니다.
// ----
interface IStore {
  namesState: INamesState;
  dirtyState: IDirtyState;
}

const MyCombineReducer = () => {
  // #4. 두개의 리듀서를 합칩니다.
  // 이때 각 리듀서는 IStore 속성에 맞춰 저장할 수 있도록 동일한 이름을 사용합니다.
  const rootReducer = combineReducers({
    namesState: namesReducer,
    dirtyState: dirtyReducer,
  });

  const store = configureStore({
    reducer: rootReducer,
  });

  return (
    <div>
      <Provider store={store}>
        <MyToolbar />
        <MyList />
      </Provider>
    </div>
  );
};

const MyToolbar = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  // #5-1. 이름을 추가하고, dirty를 true로 설정합니다.
  const onAdd = () => {
    dispatch({
      type: 'Add',
      name: nameRef.current ? nameRef.current.value : '',
    });
    dispatch({
      type: 'SetDirty',
      dirty: true,
    });
  };
  // #5-2. dirty를 false로 설정합니다.
  const onSave = () => {
    dispatch({
      type: 'Save',
      name: '', // name 정보는 사용하지 않습니다.
    });
    dispatch({
      type: 'SetDirty',
      dirty: false,
    });
  };
  return (
    <div>
      <span>{'이름'}</span>
      <input ref={nameRef} />
      <button onClick={onAdd}>{'추가'}</button>
      <button onClick={onSave}>{'저장'}</button>
    </div>
  );
};

const MyList = () => {
  // #6. useSelector()를 이용하여 store에 있는 값을 읽어옵니다.
  const names = useSelector((store: IStore) => store.namesState.names);
  const dirty = useSelector((store: IStore) => store.dirtyState.dirty);

  return (
    //#7. dirty 상태에 따라 빨간색 혹은 파란색으로 표시합니다.
    <ol>
      {names.map((name) => (
        <li
          key={name}
          style={
            {
              backgroundColor: dirty ? 'red' : 'blue',
            }
          }
        >
          {' '}
          {name}{' '}
        </li>
      ))}
    </ol>
  );
};

export default MyCombineReducer;
