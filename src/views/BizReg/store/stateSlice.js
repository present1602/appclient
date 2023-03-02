import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'bizRegForm/state',
    initialState: {
        currentStep: 0,
        stepStatus: {
            0: { status: 'pending' },
            1: { status: 'pending' },
            2: { status: 'pending' },
        },
    },
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload
        },
        setStepStatus: (state, action) => {
            state.stepStatus = { ...state.stepStatus, ...action.payload }
        },
    },
})

export const { setCurrentStep } = stateSlice.actions

export default stateSlice.reducer
