import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bizId: '',
  name: ''
}

export const bizSlice = createSlice(
  {
    name: 'biz/base',
    initialState,
    reducers: {
      setBizId: (state, action) => { state.bizId = action.payload },
      setBizPrimaryInfo: (state, { payload }) => {
        state.bizId = payload.bizId
        state.name = payload.name
      },
      resetBizKeyInfo: () => initialState
    }
  }
)

export const { setBizId, setBizPrimaryInfo, resetBizKeyInfo } = bizSlice.actions

export default bizSlice.reducer


