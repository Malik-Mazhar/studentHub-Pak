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

    toggleBookmark: (state, action) => {
      const { postId, isBookmarked } = action.payload;
      console.log("action paylaod", action)
      const post = state.posts.find(
        (post) => post._id === postId
      );

      if (post) {
        post.isBookmarked = isBookmarked;
      }
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post: any) => post._id !== action.payload
      );
    },
  },
});

export const { setPosts, addPost, toggleBookmark, deletePost } = postSlice.actions;
export default postSlice.reducer;