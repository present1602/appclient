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
      setBizInfo: (state, { payload }) => {
        state.bizId = payload.bizId
        state.name = payload.name
      },
      resetBizInfo: () => initialState
    }
  }
)

export const { setBizId, setBizInfo, resetBizInfo } = bizSlice.actions

export default bizSlice.reducer


