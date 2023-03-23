import ApiService from './ApiService'
import appConfig from '../configs/app.config'

export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: `${appConfig.apiPrefix}/biz-user/auth/login/`,
        method: 'post',
        data,
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: `${appConfig.apiPrefix}/biz-user/auth/sign-up/`,
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: `${appConfig.apiPrefix}/biz-user/auth/logout/`,
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
