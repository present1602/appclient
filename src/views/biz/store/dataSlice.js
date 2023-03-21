// import { } from 

import { createSlice } from "@reduxjs/toolkit"

const dataSlice = createSlice({
  name: 'biz_info',
  initialState: {
    biz_info: {
      name: '',
      phone: '',
      description: '',
      introduction: '',
    },
    company_info: {

    },
    place_images: []

  },
  reducers: {
    setBizInfo(state, action) {
      state.biz_info = action.payload
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


export default dataSlice.reducer


