import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {url} from "../api";

export const getVideoList = createAsyncThunk("GET_VIDEOS", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${url}`);
        return response.data.items;
    } catch (err) {
        return rejectWithValue(err.response);
    }
})

export const videoSlice = createSlice({
    name: "videos",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getVideoList.fulfilled]: (state, action) => {
            return state = action.payload;
        },
    }
})

