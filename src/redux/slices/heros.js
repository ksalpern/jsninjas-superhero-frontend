import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchHeros = createAsyncThunk("heros/fetchHeros", async () => {
  const { data } = await axios.get("/heros");
  return data;
});

export const fetchRemoveHero = createAsyncThunk('heros/fetchRemoveHeros', async (id) =>
  axios.delete(`/heros/${id}`),
);

const initialState = {
  items: [],
  status: "loading",
};

const herosSlice = createSlice({
  name: "heros",
  initialState,
  reducers: {},
  extraReducers: {
    // Получение статей
    [fetchHeros.pending]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchHeros.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "loaded";
    },
    [fetchHeros.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },

    // Remove hero
    [fetchRemoveHero.pending]: (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const herosReducer = herosSlice.reducer;
