import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "../api";
import { toast } from "react-toastify";

export const getType = createAsyncThunk("GET_TYPE", async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${url}types`, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const addType = createAsyncThunk("ADD_TYPE", async (good, {getState, rejectWithValue}) => {
  try {
    const uid = getState().user._id;
    const response = await axios.post(`${url}types`, {...good, uid}, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const editType = createAsyncThunk("EDIT_TYPE", async (type, {getState, rejectWithValue}) => {
  try {
    const uid = getState().user._id;
    const response = await axios.put(`${url}types/${type._id}`, {...type, uid}, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const deleteType = createAsyncThunk("DELETE_TYPE", async (id, {rejectWithValue}) => {
  try {
    const response = await axios.delete(`${url}types/${id}`, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const typesSlice = createSlice({
  name: "types",
  initialState:
    [{
      uid: '',
      type: '',
      reduct: ''
    }]
  ,
  reducers: {},
  extraReducers: {
    [getType.fulfilled]: (state, action) => {
      return state = action.payload;
    },
    [getType.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    },
    [addType.fulfilled]: (state, action) => {
      state.push(action.payload._id);
    },
    [addType.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    },
    [editType.fulfilled]: (state, action) => {
      const {_id, type, reduct} = action.payload;
      state = state.map((item) => {
        return item._id === _id ? {...item, type, reduct} : item;
      });
      return state;
    },
    [editType.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    },
    [deleteType.fulfilled]: (state, action) => {
      return state = state.filter((item) => item._id !== action.payload._id);
    },
    [deleteType.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    }
  }
})

