import { createSlice } from "@reduxjs/toolkit";
import { UserComment } from "../types/dataTaype";



type CommentState = {
  comments: UserComment[];
  loading: boolean;
  error: string | null;
};

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },

    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },

    toggleLike: (state, action) => {
      const updatedComment = action.payload;

      const index = state.comments.findIndex(
        (comment) => comment._id === updatedComment._id
      );
        
      if (index !== -1) {
        state.comments[index] = updatedComment;
      };
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment: any) => comment._id !== action.payload
      );
    },
  },
});

export const { setComments, addComment, toggleLike, setLoading, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;