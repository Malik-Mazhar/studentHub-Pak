import { configureStore, Tuple } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userDataReducer from './userDataSlice';
import commentsReducer from './commmentSlice'

export const store = configureStore({
   reducer: {
    auth: authReducer,
    userData: userDataReducer,
    commentsData: commentsReducer
   },
   devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;