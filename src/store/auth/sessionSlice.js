import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'auth/session',
    initialState: {
        token: '',
        signedIn: false,
    },
    reducers: {
        onSignInSuccess: (state, action) => {
            state.signedIn = true
            state.token = action.payload
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            state.token = ''
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
        }
    },
})

export const { onSignInSuccess, onSignOutSuccess, setToken, setUpdatedToken } =
    sessionSlice.actions

export default sessionSlice.reducer
