import ApiService from './ApiService'
import appConfig from '../configs/app.config'
import axios from 'axios'

const axiosRequest = axios.create({
    timeout: 600000, // 수정 필요( 0 하나 더 붙임)
    baseURL: appConfig.API_BASE_URL,
})

export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: `${appConfig.apiPrefix}/biz_user/auth/login/`,
        method: 'post',
        data,
    })
}

// export async function apiUpdateToken(data) {  // data : { refresh: xxxx } 
//     return axiosRequest.fetchData({
//         url: `${appConfig.apiPrefix}/biz_user/auth/token/refresh/`,
//         method: 'post',
//         data,
//     })
// }

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: `${appConfig.apiPrefix}/biz_user/auth/sign-up/`,
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: `${appConfig.apiPrefix}/biz_user/auth/logout/`,
        method: 'post',
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
