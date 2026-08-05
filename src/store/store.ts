import { configureStore, Tuple } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userDataReducer from './userDataSlice';
import commentsReducer from './commmentSlice'
import postsReducer from './postSlice'
import playlistReducer from './playlistSlice'
import bookmarksReducer from './bookmarkSlice'

export const store = configureStore({
   reducer: {
    auth: authReducer,
    userData: userDataReducer,
    postData: postsReducer,
    commentsData: commentsReducer,
    playlist: playlistReducer,
    bookmarksData: bookmarksReducer,
   },
   devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;