import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    text: {
        isSuccess: false,
        tries: 0,
        correctWord: '',
        wordPos: 0,
        words: {
            word: '',
            isClicked: false
        }
    },
    isLoaded: false,
}
export const getTexts = createAsyncThunk(
    'GET_TEXTS',
    async (_, {rejectedWithValue}) => {
        try {
            const response = await axios.get('/api');
            const {timestexts} = response.data[0];
            return timestexts;
        } catch (err) {
            return rejectedWithValue(err.response.data);
        }
    }
)


export const textsSlice = createSlice({
    name: 'texts',
    initialState,
    reducers: {
        setClicked: (state, {payload}) => {
            const {ind, step, text} = payload;
            const newState = text.map((item, index) => {
                if (index !== step) return item;
                let {words, tries, wordPos} = item;
                tries += 1;
                const newWords = words.map((word, index) => {
                    if (ind !== index) return word;
                    return {...word, isClicked: true}
                });
                if (wordPos === ind) {
                    return {...item, isSuccess:true, tries: tries, words: newWords}
                }
                return {...item, tries: tries, words: newWords}
            });
            return {...state, text: newState};
        }
    },
    extraReducers: {
        [getTexts.fulfilled]: (state, {payload}) => {
            const newState = payload.map((item) => {
                const {text, correctWord, wordPos} = item;
                const words = text.split(' ').map((item) => {
                    return {word: item, isClicked: false};
                });
                return {...state.text, words, correctWord, wordPos};
            });
            return {...state, text: newState, isLoaded: true};
        }
    }
})

// Action creators are generated for each case reducer function
export const {setClicked} = textsSlice.actions

export default textsSlice.reducer
