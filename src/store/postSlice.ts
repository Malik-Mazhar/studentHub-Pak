import { createSlice } from "@reduxjs/toolkit";
import { userPostType } from "../types/dataTaype";

type PostState = {
  posts: userPostType[];
  loading: boolean;
  error: string | null;
};

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post: any) => post._id !== action.payload
      );
    },
  },
});

export const { setPosts, addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;