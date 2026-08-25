import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaylistState {
  playlists: any[];
  loading: boolean;
}

const initialState: PlaylistState = {
  playlists: [],
  loading: false,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylists: (state, action: PayloadAction<any[]>) => {
      state.playlists = action.payload;
    },

    addPlaylist: (state, action: PayloadAction<any>) => {
      state.playlists.unshift(action.payload);
    },

    toggleBookmarkPlaylist: (state, action) => {
      const { postId, isBookmarked } = action.payload;

      const post = state.playlists.find(
        (post) => post._id === postId
      );
      console.log("action.payload", state.playlists)

      if (post) {
        post.isBookmarked = isBookmarked;
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setPlaylists,
  addPlaylist,
  toggleBookmarkPlaylist,
  setLoading,
} = playlistSlice.actions;

export default playlistSlice.reducer;