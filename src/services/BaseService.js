import axios from 'axios'
import appConfig from 'configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from 'constants/api.constant'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'
import store from '../store'
import { onSignOutSuccess, setUpdatedToken } from '../store/auth/sessionSlice'
import { apiUpdateToken } from './AuthService'
import moment from 'moment'

const unauthorizedCode = [401]

const BaseService = axios.create({
    timeout: 600000, // 수정 필요( 0 하나 더 붙임)
    baseURL: appConfig.API_BASE_URL,
})

// async function getNewToken(accessToken) {
//     if (accessToken) {
//         const newAccessToken = await updateToken({ 'refresh': accessToken.refresh })
//     }
// }

// export async function apiUpdateToken(data) {  // data : { refresh: xxxx } 
//     return ApiService.fetchData({
//         url: `${appConfig.apiPrefix}/biz_user/auth/token/refresh/`,
//         method: 'post',
//         data,
//     })
// }

async function getNewToken(refreshToken, config) {
    // const newToken = await apiUpdateToken({ 'refresh': refreshToken })
    // const newToken = await axios.post(
    //     `${appConfig.apiPrefix}/biz_user/auth/token/refresh/`,
    //     { 'refresh': refreshToken })
    const response = await axios(
        `${appConfig.API_BASE_URL}${appConfig.apiPrefix}/biz_user/auth/token/refresh/`,
        {
            method: 'post',
            data: { 'refresh': refreshToken }
        }
    )
    debugger;
    // return response
    store.dispatch(setUpdatedToken({
        'access': response.data.access,
        'access_token_expired_at': moment().add(1, "minute").format("yyyy-MM-DD HH:mm:ss")
    }))

    config.headers[
        REQUEST_HEADER_AUTH_KEY
    ] = `${TOKEN_TYPE}${response.data.access}`

    return config
}
BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)

        const persistData = deepParseJson(rawPersistData)

        const accessToken = persistData.auth.session.token

        if (accessToken && accessToken.access) {
            debugger;
            if (accessToken.access_token_expired_at) {
                const expiredAt = new Date(accessToken.access_token_expired_at)
                if (new Date() > expiredAt && accessToken.refresh) {
                    // const newToken = getNewToken(accessToken, config)
                    getNewToken(accessToken.refresh, config)
                }
                else {
                    config.headers[
                        REQUEST_HEADER_AUTH_KEY
                    ] = `${TOKEN_TYPE}${accessToken.access}`
                    return config
                }
            } else {
                config.headers[
                    REQUEST_HEADER_AUTH_KEY
                ] = `${TOKEN_TYPE}${accessToken.access}`
                return config
            }
        }
        // if (accessToken) {
        //     config.headers[
        //         REQUEST_HEADER_AUTH_KEY
        //     ] = `${TOKEN_TYPE}${accessToken}`
        // }
        else {
            return config
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(onSignOutSuccess())
        }

        return Promise.reject(error)
    }
)

export default BaseService
