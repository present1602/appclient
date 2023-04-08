// import { } from 

import { bindActionCreators, createSlice } from "@reduxjs/toolkit"

const initData = {
  biz_info: {
    name: ''
  },
  company_info: {

  },
  place_images: []

}

const dataSlice = createSlice({
  name: 'biz_info',
  initialState: initData,
  reducers: {
    setBizInfo(state, action) {
      state.biz_info = action.payload
    },
    resetBizInfo(state, action) {
      state.biz_info = initData
    },
    setCompanyInfo(state, action) {
      state.company_info = action.payload
    },
    setPlaceImages(state, action) {
      state.place_images = action.payload
    }
  },
  extraReducers: {}
})
export const { setBizInfo, setCompanyInfo, setPlaceImages, resetBizInfo } = dataSlice.actions

export default dataSlice.reducer


