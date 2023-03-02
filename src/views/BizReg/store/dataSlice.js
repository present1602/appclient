import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiBizRegSave, apiGetBizReg } from 'services/BizRegService'

export const getForm = createAsyncThunk(
    'bizRegForm/data/getForm',
    async (data) => {
        const response = await apiGetBizReg(data)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'bizRegForm/data',
    initialState: {
        formData: {
            personalInformation: {
                email: '',
            },
            addressInformation: {
                address1: '',
                address2: '',
            },
        },
        stepStatus: {
            0: { status: 'pending' },
            1: { status: 'pending' },
            2: { status: 'pending' },
        },
    },
    reducers: {
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload }
        },
        setStepStatus: (state, action) => {
            state.stepStatus = { ...state.stepStatus, ...action.payload }
        },
    },
    extraReducers: {
        [getForm.fulfilled]: (state, action) => {
            state.formData = action.payload.formData
            state.stepStatus = action.payload.formStatus
        },
    },
})

export const { setFormData, setStepStatus } = dataSlice.actions

export default dataSlice.reducer
