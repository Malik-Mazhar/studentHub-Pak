import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoryItem } from "../types/dataTaype";

interface HistoryState {
  history: HistoryItem[];
  loading: boolean;
}

const initialState: HistoryState = {
  history: [],
  loading: false,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<HistoryItem[]>) => {
      state.history = action.payload;
    },

    setHistoryLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { setHistory, setHistoryLoading, clearHistory } = historySlice.actions;

export default historySlice.reducer;