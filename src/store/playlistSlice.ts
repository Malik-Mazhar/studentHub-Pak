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

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setPlaylists,
  addPlaylist,
  setLoading,
} = playlistSlice.actions;

export default playlistSlice.reducer;