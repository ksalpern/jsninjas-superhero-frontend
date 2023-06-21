import { configureStore } from "@reduxjs/toolkit";
import { herosReducer } from "./slices/heros";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    heros: herosReducer,
    auth: authReducer,
  },
});

export default store;
