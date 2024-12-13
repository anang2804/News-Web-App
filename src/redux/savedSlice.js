import { createSlice } from "@reduxjs/toolkit";

export const savedSlice = createSlice({
  name: "saved",
  initialState: {
    saved: [],
  },
  reducers: {
    saveArticle: (state, action) => {
      state.saved = 0;
    },
    unsaveArticle: (state, action) => {
      return state.filter((article) => article.id !== action.payload.id);
    },
  },
});

export const { saveArticle, unsaveArticle } = savedSlice.actions;
export default savedSlice.reducer;
