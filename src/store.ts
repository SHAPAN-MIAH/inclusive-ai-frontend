// src/app/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './features/user/userSlice';

// const store = configureStore({
//   reducer: {
//     user: userReducer
//   }
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;



import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './features/user/userSlice';
import chatWithAiContinueSlice from './features/chatWithAiContinueSlice';
import ChatWithAiAnalysisDone from './features/ChatWithAiAnalysisDone';


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedReducerTwo = persistReducer(persistConfig, chatWithAiContinueSlice);
const persistedReducersThree = persistReducer(persistConfig, ChatWithAiAnalysisDone);

const store = configureStore({
  reducer: {
    userData: persistedReducer,
    chatWithAiAnalysisContinue: persistedReducerTwo,
    chatWithAiAnalysisDone: persistedReducersThree,
  },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store,persistor};
