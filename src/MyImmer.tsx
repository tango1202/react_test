import { useRef } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Action, combineReducers } from 'redux';
import { produce, Draft } from 'immer'; // #1. 혹시 설치되지 않았다면, npm install -D immer 를 하면 됩니다.

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
  // #2. produce() 를 이용하여 state를 수정하는 함수를 사용합니다.
  // 첫번째 인자 state : 수정하려는 개체
  // 두번째 인자 : state를 변경하는 함수
  return produce(state, (draft: Draft<INamesState>) => {
    switch (action.type) {
      case 'Add':
        return {
          ...state,
          names: [...state.names, action.name],
        };
      case 'Save':
        console.log('이름들을 저장합니다.');
        return state;
      default:
        return state;
    }
  });
};

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

interface IStore {
  namesState: INamesState;
  dirtyState: IDirtyState;
}

const MyImmer = () => {
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
  const onSave = () => {
    dispatch({
      type: 'Save',
      name: '',
    });
    dispatch({
      type: 'SetDirty',
      dirty: false,
    });
  };
  return (
    <div>
      <span>{'(Immer 테스트) 이름'}</span>
      <input ref={nameRef} />
      <button onClick={onAdd}>{'추가'}</button>
      <button onClick={onSave}>{'저장'}</button>
    </div>
  );
};

const MyList = () => {
  const names = useSelector((store: IStore) => store.namesState.names);
  const dirty = useSelector((store: IStore) => store.dirtyState.dirty);

  return (
    <ol>
      {names.map((name) => (
        <li
          key={name}
          style={{
            backgroundColor: dirty ? 'red' : 'blue',
          }}
        >
          {name}
        </li>
      ))}
    </ol>
  );
};

export default MyImmer;
