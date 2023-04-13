// import { } from 

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiGetPortalImages } from "services/BizService"

export const getPortalImageData = createAsyncThunk(
  'biz/fetchPortalImages',
  async (bizId) => {
    const response = await apiGetPortalImages(bizId)
    return response.data
  }
)

const img1 = {
  "full_path": 'https://member-biz-bucket.s3-ap-northeast-2.amazonaws.com/bizfile/58225스크린샷 2023-04-05 오후 1.13.34.png',
  "filename": 'aa',
  "original_filename": 'bb',
  'ord': 0
}
const img2 = {
  "full_path": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThrAJMFu_LAufYEiLsf33W842kH2V4zRo1rQ&usqp=CAU',
  "filename": 'aaimg2',
  "original_filename": 'bbimg2',
  'ord': 1
}
const initData = {
  biz_info: {
    name: '',
    phone: '',
    introduction: '',
    description: '',
    address: {},
  },
  company_info: {

  },
  portal_images: [img1]

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
    setPortalImages(state, action) {
      state.portal_images = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPortalImageData.fulfilled, (state, action) => {
        state.portal_images = action.payload
      })
  },
})
export const { setBizInfo, setCompanyInfo, setPlaceImages, resetBizInfo, setPortalImages } = dataSlice.actions

export default dataSlice.reducer


