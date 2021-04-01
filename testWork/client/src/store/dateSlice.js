import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "../api";
import { toast } from "react-toastify";

export const getDate = createAsyncThunk("GET_DATE", async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${url}dates`, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const addDate = createAsyncThunk("ADD_DATE", async (date, {getState, rejectWithValue}) => {
  try {
    const uid = getState().user._id;
    const response = await axios.post(`${url}dates`, {...date, uid}, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const editDate = createAsyncThunk("EDIT_DATE", async (date, {getState, rejectWithValue}) => {
  try {
    const uid = getState().user._id;
    const response = await axios.put(`${url}dates/${date._id}`, {...date,uid}, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const deleteDate = createAsyncThunk("DELETE_DATE", async (id, {rejectWithValue}) => {
  try {
    const response = await axios.delete(`${url}dates/${id}`, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const dateSlice = createSlice({
  name: "dates",
  initialState:
    [{
      uid: '',
      date: '',
      reduct: '',
    }]
  ,
  reducers: {},
  extraReducers: {
    [getDate.fulfilled]: (state, action) => {
      return state = action.payload;
    },
    [getDate.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    },
    [addDate.fulfilled]: (state, action) => {
      state.push(action.payload._id);
    },
    [addDate.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    },
     [editDate.fulfilled]: (state, action) => {
       const {_id, date, reduct} = action.payload;
       state = state.map((item) => {
         return item._id === _id ? {...item, date, reduct} : item;
       });
       return state;
    },
    [editDate.rejected]: (state, action) => {
      console.log('!!!!');
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    },
    [deleteDate.fulfilled]: (state, action) => {
      return state = state.filter((item) => item._id !== action.payload._id);
    },
    [deleteDate.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    }

  }
})

