import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getVideoItem = createAsyncThunk("GET_VIDEO_ITEM", async (id, {rejectWithValue}) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=eVt3se6cy3Y&key=AIzaSyB1dl26a5sMz84yxb2K9jezyDb_yLrSmno&part=statistics&part=snippet`);
        return response.data.items;
    } catch (err) {
        return rejectWithValue(err.response);
    }
})

export const playvideoSlice = createSlice({
    name: "video",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getVideoItem.fulfilled]: (state, action) => {
            return state = action.payload;
        },
    }
})

