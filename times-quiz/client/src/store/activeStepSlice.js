import {createSlice} from '@reduxjs/toolkit'

export const activeStepSlice = createSlice({
    name: 'steps',
    initialState: {
        step: 0
    },
    reducers: {
        prevStep: (state) => {
            state.step -= 1;
        },
        nextStep: (state) => {
            state.step += 1;
        },
        setStep: (state, {payload}) => {
            state.step = payload;
        }
    }
})

export const {prevStep, nextStep, setStep} = activeStepSlice.actions

export default activeStepSlice.reducer
