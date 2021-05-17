import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  loading: false,
  hasError: false,
  userToken: {},
};

const authSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerUser: (state) => {
      state.loading = true;
    },
    registerUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.userToken = payload;
      localStorage.setItem("userToken", payload);
    },
    registerUserFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    loginUser: (state) => {
      state.loading = true;
    },
    loginUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.userToken = payload;
      localStorage.setItem("userToken", payload);
    },
    loginUserFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

//actions;
export const {
  registerUser,
  registerUserFailure,
  registerUserSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
} = authSlice.actions;

//A selector
export const authSelector = (state) => state.auth;

//reducer
export default authSlice.reducer;

//Thunks
//register
export function registerNewUser(userInfo) {
  return async (dispatch) => {
    dispatch(registerUser());

    try {
      const { data } = axios.post("http://localhost:3001/api/auth/register");

      dispatch(registerUserSuccess(data));
    } catch (error) {
      dispatch(registerUserFailure());
    }
  };
}

//login
export function loginExistingUser(userInfo) {
  return async (dispatch) => {
    dispatch(loginUser());

    try {
      const { data } = axios.post("http://localhost:3001/api/auth/login");
      dispatch(loginUserSuccess(data));
    } catch (error) {
      dispatch(loginUserFailure());
    }
  };
}
