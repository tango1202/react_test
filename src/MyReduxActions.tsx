import { useRef } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createAction, handleActions, Action } from 'redux-actions'; // #1. redux-actions의 Action을 사용합니다.
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, Dispatch } from 'redux';
import { produce, Draft } from 'immer'; 

interface INamesState {
  names: string[];
}

const namesInitialState: INamesState = {
  names: ['홍길동', '성춘향'],
};

// #2. 액션 타입입니다. 아무 문자열이나 됩니다. 구조적 관리를 위해 카테고리/기능명의 형식으로 작성해 봤습니다.
const ADD_USERS: string = 'users/ADD_USERS'; 
const SAVE_USERS: string = 'users/SAVE_USERS';

// #3. 지정한 액션 타입으로 액션 함수를 만듭니다. 
const addUsersAction = createAction(ADD_USERS);
const saveUsersAction = createAction(SAVE_USERS);

// #4. 각 액션 타입에 따른 액션 함수가 정의된 reducerMap을 정의합니다. 
// 이전엔 switch() 로 분기했지만, 맵의 속성을 key로 하여 분기 합니다.
const userActions = {
  // #4-1. Action은 전달되는 데이터 타입으로 구체화해서 사용합니다.
  [ADD_USERS]: (state: INamesState, action: Action<string>): INamesState => {
    return produce(state, (draft: Draft<INamesState>) => {
      console.dir(action);
      draft.names.push(action.payload);
    });
  },
  [SAVE_USERS]: (state: INamesState, action: Action<string>): INamesState => {
    return produce(state, (draft: Draft<INamesState>) => {
      console.log('이름들을 저장합니다.');
    });
  },
};

// #5. reducerMap으로부터 reducer를 생성합니다.
const namesReducer = handleActions(
  {
    ...userActions,
    // 여러 카테고리를 각각 관리하는 경우, Spread 문법을 이용하여 통합할 수 있습니다.
    // 예를 들면, 다음처럼요.
    // ...filesActions,
    // ...editActions,
    // ...viewActions,
    // ...helpActions
  },
  namesInitialState,
);

interface IDirtyState {
  dirty: boolean;
}
const dirtyInitialState: IDirtyState = {
  dirty: false,
};
const SET_DIRTY: string = 'doc/SET_DIRTY';
const setDirtyAction = createAction(SET_DIRTY);

const docActions = {
  [SET_DIRTY]: (state: IDirtyState, action: any): IDirtyState => {
    return produce(state, (draft: Draft<IDirtyState>) => {
      draft.dirty = action.payload;
    });
  },
};

const dirtyReducer = handleActions(
  {
    ...docActions,
  },
  dirtyInitialState,
);

interface IStore {
  namesState: INamesState;
  dirtyState: IDirtyState;
}

const MyReduxActions = () => {
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
  // #6 : dispatch()를 이용하여 액션을 호출합니다.다만, Action은 전달되는 데이터 타입으로 구체화해서 사용해야 합니다.
  // 이름은 string이고, dirty는 boolean이므로 두가지 타입을 모두 허용했습니다. 
  // 다음처럼 '|'로 나열할 수도 있지만, 실무에선 보다 다양한 형식이 사용되기 때문에, 편의상 그냥 'any'를 사용하게 될 수도 있습니다.
  const dispatch = useDispatch<Dispatch<Action<string | boolean>>>();

  const onAdd = () => {
    dispatch(addUsersAction(nameRef.current ? nameRef.current.value : ''));
    dispatch(setDirtyAction(true));
  };
  const onSave = () => {
    dispatch(saveUsersAction());
    dispatch(setDirtyAction(false));
  };
  return (
    <div>
      <span>{'(redux-actions 테스트) 이름'}</span>
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

export default MyReduxActions;
