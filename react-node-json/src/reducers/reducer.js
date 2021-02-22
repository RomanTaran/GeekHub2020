import { createSlice } from "@reduxjs/toolkit";

const isErrorSlice = createSlice({
  name:"myError",
  initialState:false,
  reducers:{
    setError(state) {
      return !state;
    }
  }
})

export const {setError} = isErrorSlice.actions
export default isErrorSlice.reducer