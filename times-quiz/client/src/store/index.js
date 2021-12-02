import { configureStore } from '@reduxjs/toolkit'
import textsReducer from './textsSlice'
import activeStepReducer from './activeStepSlice'

export const store = configureStore({
    reducer: {
        texts: textsReducer,
        steps: activeStepReducer
    },
})

