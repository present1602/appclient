import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  packageDc: {
    name: '3',
    description: '',
    bundleMenu: [
      {
        'period': { 'key': '4W' },
        'name': '4주 10팩',
        'price': 0,
        'original_price': 0,
      },
    ]
  }
}
const dataSlice = createSlice({
  name: 'packageDc/data',
  initialState,
  reducers: {
    setPackageDcData: (state, action) => {
      state.packageDc = { ...state, ...action.payload }
    },
    setBundleMenu: (state, action) => {
      state.packageDc.bundleMenu = action.payload
    },
    resetPackageDcData: (state, action) => {
      state.packageDc = initialState
    }
  }
})


export const { setPackageDcData, resetPackageDcData, setBundleMenu } = dataSlice.actions
export default dataSlice.reducer // 그냥 남들처럼만