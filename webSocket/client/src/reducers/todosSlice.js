import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/'

export const getTodos = createAsyncThunk("GET_TODOS", async () => {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
 })

export const addTodo = createAsyncThunk("ADD_TODO", async (text, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${BASE_URL}todo`, {id: Math.random(), text: text, completed: false})
    return {id: Math.random(), text: text, completed: false};
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const deleteTodo = createAsyncThunk("DELETE_TODO", async ({id}, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${BASE_URL}todo/${id}`, {id});
    return id;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const editTodo = createAsyncThunk("EDIT_TODO", async (todo, {rejectWithValue}) => {
  try {
    const response = await axios.put(`${BASE_URL}todo/${todo.id}`, {...todo});
    return {id: todo.id, text: todo.text};
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

export const completeTodo = createAsyncThunk("COMPLETE_TODO", async (id, {rejectWithValue}) => {
  try {
    const response = await axios.put(`${BASE_URL}todo/complete/${id}`, {id});
    return id;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }

})

export const todoReducer = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    error: null
  },
  reducers: {
    resetError(state) {
      state.error = '';
    }
  },
  extraReducers: {
    [getTodos.fulfilled]: (state, action) => {
      state.todos = action.payload
    },
    [addTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload)
    },
    [addTodo.rejected]: (state, action) => {
      if (!action.payload) {
        state.error = "Error in connection with server. Check your internet connection"
      } else {
        state.error = action.payload;
      }
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    [deleteTodo.rejected]: (state, action) => {
      if (!action.payload) {
        state.error = "Error in connection with server. Check your internet connection"
      } else {
        state.error = action.payload;
      }
    },
    [editTodo.fulfilled]: (state, action) => {
      const {id, text} = action.payload;
      state.todos = state.todos.map((item) => {
        return item.id === id ? {...item, text} : item;
      });
    },
    [editTodo.rejected]: (state, action) => {
      if (!action.payload) {
        state.error = "Error in connection with server. Check your internet connection"
      } else {
        state.error = action.payload;
      }
    },
    [completeTodo.fulfilled]: (state, action) => {
      state.todos = state.todos.map((item) => {
        const completed = item.completed !== true;
        return item.id === action.payload ? {...item, completed: completed} : item;
      });
    },
    [completeTodo.rejected]: (state, action) => {
      if (!action.payload) {
        state.error = "Error in connection with server. Check your internet connection"
      } else {
        state.error = action.payload;
      }
    },
  }
})

export const {resetError} = todoReducer.actions