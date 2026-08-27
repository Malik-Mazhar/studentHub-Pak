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

    
    toggleLikePost: (state, action) => {
      const { postId, isLiked, likesCount } = action.payload;
      console.log("action.payload", action.payload)

      const post = state.posts.find(
        (post) => post._id === postId
      );
        
      if (post) {
        post.isLiked = isLiked;
        post.postLikesCount = likesCount;
      };
    },

    toggleBookmark: (state, action) => {
      const { postId, isBookmarked } = action.payload;
      const post = state.posts.find(
        (post) => post._id === postId
      );

      if (post) {
        post.isBookmarked = isBookmarked;
      }
    },

    updatePostVote: (state, action) => {
      const { postId, option } = action.payload;

      const post = state.posts.find(
        (post) => post._id === postId
      );

      if (!post || !post.pollResults) return;

      // Agar user pehle vote kar chuka hai
      const oldOption = post.votedOption;

      // First time vote
      if (!post.hasVoted) {
        post.totalVotes = (post.totalVotes ?? 0) + 1;

        const selected = post.pollResults.find(
          (item) => item.option === option
        );

        if (selected) {
          selected.votes += 1;
        }
      }

      // Vote change
      else if (oldOption !== option) {
        const old = post.pollResults.find(
          (item) => item.option === oldOption
        );

        const selected = post.pollResults.find(
          (item) => item.option === option
        );

        if (old) old.votes -= 1;
        if (selected) selected.votes += 1;
      }

      // Percentages dobara calculate
      post.pollResults.forEach((item) => {
        item.percentage =
          (post.totalVotes ?? 0) > 0
            ? Math.round((item.votes / (post.totalVotes ?? 0)) * 100)
            : 0;
      });

      post.hasVoted = true;
      post.votedOption = option;
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post: any) => post._id !== action.payload
      );
    },
  },
});

export const { setPosts, addPost, toggleLikePost, toggleBookmark, updatePostVote, deletePost } = postSlice.actions;
export default postSlice.reducer;