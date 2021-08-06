import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../api";
import { toast } from "react-toastify";

export const getMovie = createAsyncThunk("GET_MOVIE", async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${url}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const addMovie = createAsyncThunk("ADD_MOVIE", async (movie, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${url}`, movie);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const deleteMovie = createAsyncThunk("DELETE_MOVIE", async (_id, {rejectWithValue}) => {
  try {
    const response = await axios.delete(`${url}/${_id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const watchlatermoviesSlice = createSlice({
  name: "movies",
  initialState:[],
  reducers: {},
  extraReducers: {
    [getMovie.fulfilled]: (state, action) => {
      return state = action.payload;
    },
    [getMovie.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    },
    [addMovie.fulfilled]: (state, action) => {
      state.push(action.payload._id);
    },
    [addMovie.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    },
    [deleteMovie.fulfilled]: (state, action) => {
      return state = state.filter((item) => item._id !== action.payload._id);
    },
    [deleteMovie.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    }
  }
})

