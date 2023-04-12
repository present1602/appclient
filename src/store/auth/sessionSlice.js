import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'auth/session',
    initialState: {
        token: '',
        signedIn: false,
        bizKeyInfo: null
    },
    reducers: {
        onSignInSuccess: (state, { payload }) => {
            state.signedIn = true
            state.token = payload.token
            if (payload.is_owner == 'Y' && payload.biz_info) {
                state.bizKeyInfo = payload.biz_info
            }
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            state.token = ''
            state.bizKeyInfo = null
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUpdatedToken: (state, action) => {
            // state.token.access = action.payload.access
            // state.token.access_token_expired_at = action.payload.access_token_expired_at
            state.token = {
                ...state.token,
                access: action.payload.access,
                access_token_expired_at: action.payload.access_token_expired_at
            }
        },
        setBizId: (state, action) => { state.bizId = action.payload },
        setBizKeyInfo: (state, { payload }) => {
            state.bizKeyInfo = payload
        },
        // resetBizKeyInfo: (state) => { state.bizKeyInfo = null },
    },
})

export const { onSignInSuccess, onSignOutSuccess, setToken, setUpdatedToken, setBizKeyInfo } =
    sessionSlice.actions

export default sessionSlice.reducer
