import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { url } from "../api";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

export const signupUser = createAsyncThunk(
  'users/signup',
  async (user, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${url}signup`, user);
      let token = await response.data;
      if (response.status === 200) {
        localStorage.setItem('token', token);
        return token;
      } else {
        return rejectWithValue(token);
      }

    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async (user, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${url}login`, user);
      let token = await response.data;
      if (response.status === 200) {
        localStorage.setItem('token', token);
        return token;
      } else {
        return rejectWithValue(token);
      }

    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem("token"),
    name: null,
    email: null,
    _id: null
  },
  reducers: {
    signoutUser: state => {
      localStorage.removeItem("token");
      return {
        token: localStorage.getItem("token"),
        name: null,
        email: null,
        _id: null
      };
    },
    loadUser: (state, getState) => {
      if (state.token) {
        const user = jwtDecode(state.token);
        return user;
      }
      return state;
    }
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, {payload}) => {
      const user = jwtDecode(payload);
      return {
        token: payload.token,
        name: user.name,
        email: user.email,
        _id: user._id
      }
    },
    [signupUser.rejected]: (state, {payload}) => {
      toast.error(payload.data,{position: toast.POSITION.BOTTOM_RIGHT})
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      const user = jwtDecode(payload);
      console.log(user);
      return {
        token: payload.token,
        name: user.name,
        email: user.email,
        _id: user._id
      }
    },
    [loginUser.rejected]: (state, {payload}) => {
      toast.error(payload,{position: toast.POSITION.TOP_RIGHT})
    }
  },
});

export const {signoutUser, loadUser} = userSlice.actions;

