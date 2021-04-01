import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "../api";
import { toast } from "react-toastify";

export const getGoods = createAsyncThunk("GET_GOODS", async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${url}goods`, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const addGood = createAsyncThunk("ADD_GOOD", async (good, {getState, rejectWithValue}) => {
  try {
    const uid = getState().user._id;
    const response = await axios.post(`${url}goods`, {good, uid}, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const deleteGood = createAsyncThunk("DELETE_GOOD", async (id, {rejectWithValue}) => {
  try {
    const response = await axios.delete(`${url}goods/${id}`, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const editGood = createAsyncThunk("EDIT_GOOD", async (good, {getState, rejectWithValue}) => {
  try {
    const uid = getState().user._id;
    const response = await axios.put(`${url}goods/${good._id}`, {good, uid}, setHeaders());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const goodsSlice = createSlice({
  name: "goods",
  initialState:
    [{
      uid: '',
      date: '',
      type: '',
      sum: '',
      comment: ''
    }]
  ,
  reducers: {},
  extraReducers: {
    [getGoods.fulfilled]: (state, action) => {
      return state = action.payload;
    },
    [getGoods.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    },
    [addGood.fulfilled]: (state, action) => {
      state.push({...action.payload})
    },
    [addGood.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    },
    [deleteGood.fulfilled]: (state, action) => {
      return state.filter(elem => {
        return elem._id !== action.payload._id
      })
    },
    [deleteGood.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    },
    [editGood.fulfilled]: (state, action) => {
      const {_id, date, type, sum, comment} = action.payload;
      state = state.map((item) => {
        return item._id === _id ? {...item, date, type, sum, comment} : item;
      });
      return state;
    },
    [editGood.rejected]: (state, action) => {
      toast.error(action.payload, {position: toast.POSITION.BOTTOM_CENTER})
    }
  }
})

