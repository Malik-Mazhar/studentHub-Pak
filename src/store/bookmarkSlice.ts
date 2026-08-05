import { createSlice } from "@reduxjs/toolkit";
import { PlaylistType, userPostType } from "../types/dataTaype";

type BookmarkItem = userPostType & PlaylistType

type BookmarkState = {
    bookmarks: BookmarkItem[];
    loading: boolean;
    error: string | null;
};

const initialState: BookmarkState = {
    bookmarks: [],
    loading: false,
    error: null,
};

export const postSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    setBookmarks(state, action) {
        state.bookmarks = action.payload;
    },

    addBookmark(state, action) {
        state.bookmarks.unshift(action.payload);
    },

    removeBookmark(state, action) {
        state.bookmarks = state.bookmarks.filter(
            post => post._id !== action.payload
        );
    },
  },
});

export const {setBookmarks, addBookmark, removeBookmark } = postSlice.actions;
export default postSlice.reducer;