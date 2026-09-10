import { configureStore, Tuple } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userDataReducer from './userDataSlice';
import commentsReducer from './commmentSlice'
import postsReducer from './postSlice'
import playlistReducer from './playlistSlice'
import bookmarksReducer from './bookmarkSlice'
import notificationReducer from "./notificationSlice";
import historyReducer from "./historySlice";

export const store = configureStore({
   reducer: {
    auth: authReducer,
    userData: userDataReducer,
    postData: postsReducer,
    commentsData: commentsReducer,
    playlist: playlistReducer,
    bookmarksData: bookmarksReducer,
    notifications: notificationReducer,
    history: historyReducer,
   },
   devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;