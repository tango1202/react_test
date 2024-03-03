import { useRef } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// ----
// 사용자 이름을 관리하는 Slice 입니다.
// ----
interface INamesState {
  names: string[];
}

const namesInitialState: INamesState = {
  names: ['홍길동', '성춘향'],
};

// #1. createSlice()로 이름, 초기값, 액션, 리듀서를 응집합니다.
const namesSlice = createSlice({
  name: 'namesState',
  initialState: namesInitialState,
  // #2. 액션이 함수화 되어 있습니다.
  // 이때 PayloadAction을 사용합니다. action.payload에 실제 데이터가 전달됩니다.
  reducers: {
    add: (state: INamesState, action: PayloadAction<string>) => {
      // #3. 인자로 전달된 state를 직접 수정합니다.
      state.names = [...state.names, action.payload];
    },
    save: (state: INamesState, action: PayloadAction<string>) => {
      console.log('이름들을 저장합니다.');
    },
  },
});

// ----
// 데이터가 수정되었는지 여부를 관리하는 Slice 입니다.
// ----
interface IDirtyState {
  dirty: boolean;
}
const dirtyInitialState: IDirtyState = {
  dirty: false,
};

// #1. createSlice()로 이름, 초기값, 액션, 리듀서를 응집합니다.
const dirtySlice = createSlice({
  name: 'dirtyState',
  initialState: dirtyInitialState,
  reducers: {
    setDirty: (state: IDirtyState, action: PayloadAction<boolean>) => {
      state.dirty = action.payload;
    },
  },
});

// ----
// 리덕스에 저장되는 형태입니다.
// ----
interface IStore {
  namesState: INamesState;
  dirtyState: IDirtyState;
}

const MySlice = () => {
  // #4. configureStore()에서 combineReducers()처럼 리듀서를 합칩니다.
  const store = configureStore({
    reducer: {
      namesState: namesSlice.reducer,
      dirtyState: dirtySlice.reducer,
    },
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
    // #5. add(), setDirty()등 함수화된 액션을 호출합니다.
    // 이때 액션으로 전달될 payload 값을 전달합니다.
    const payload = nameRef.current ? nameRef.current.value : '';
    dispatch(namesSlice.actions.add(payload));
    dispatch(dirtySlice.actions.setDirty(true));
  };
  const onSave = () => {
    dispatch(namesSlice.actions.save(''));
    dispatch(dirtySlice.actions.setDirty(false));
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
  const names = useSelector((store: IStore) => store.namesState.names);
  const dirty = useSelector((store: IStore) => store.dirtyState.dirty);

  return (
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
          {name}
        </li>
      ))}
    </ol>
  );
};

export default MySlice;
