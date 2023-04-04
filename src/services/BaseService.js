import axios from 'axios'
import appConfig from 'configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from 'constants/api.constant'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'
import store from '../store'
import { onSignOutSuccess, setUpdatedToken } from '../store/auth/sessionSlice'
import moment from 'moment'

const unauthorizedCode = [401]

const BaseService = axios.create({
    timeout: 600000, // 수정 필요( 0 하나 더 붙임)
    baseURL: appConfig.API_BASE_URL,
})

// BaseService.interceptors.request.use(
//     async (config) => {
// const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)

// const persistData = deepParseJson(rawPersistData)

//         const accessToken = persistData.auth.session.token
//         if (accessToken && accessToken.access && accessToken.access_token_expired_at) {
//             const exp = new Date(accessToken.access_token_expired_at)
//             if (new Date() > exp && accessToken.refresh) {
//                 const response = await axios(
//                     `${appConfig.API_BASE_URL}${appConfig.apiPrefix}/biz-user/auth/token/refresh/`,
//                     {
//                         method: 'post',
//                         data: { 'refresh': accessToken.refresh }
//                     }
//                 )
//                 // return response
//                 store.dispatch(setUpdatedToken({
//                     'access': response.data.access,
//                     'access_token_expired_at': moment().add(1, "minute").format("yyyy-MM-DD HH:mm:ss")
//                 }))

//             }
//         }

//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )

// BaseService.interceptors.request.use(
//     async (config) => {
//         const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)

//         const persistData = deepParseJson(rawPersistData)

//         const accessToken = persistData.auth.session.token
//         if (accessToken && accessToken.access) {

//             if (accessToken.access_token_expired_at && accessToken.refresh) {
//                 const expDate = new Date(accessToken.access_token_expired_at)
//                 if (new Date() > expDate) {
//                     const refreshRes = await axios(
//                         `${appConfig.API_BASE_URL}${appConfig.apiPrefix}/biz-user/auth/token/refresh/`,
//                         {
//                             method: 'post',
//                             data: { 'refresh': accessToken.refresh }
//                         }
//                     )
//                     store.dispatch(
//                         setUpdatedToken({
//                             'access': refreshRes.data.access,
//                             'access_token_expired_at': moment().add(1, 'minute').format("yyyy-MM-DD HH:mm:ss")
//                         })
//                     )
//                     config.headers[
//                         REQUEST_HEADER_AUTH_KEY
//                     ] = `${TOKEN_TYPE}${refreshRes.access}`
//                     return config
//                 } else {
//                     config.headers[
//                         REQUEST_HEADER_AUTH_KEY
//                     ] = `${TOKEN_TYPE}${accessToken.access}`
//                     return config
//                 }
//             } else {
//                 config.headers[
//                     REQUEST_HEADER_AUTH_KEY
//                 ] = `${TOKEN_TYPE}${accessToken.access}`
//                 return config
//             }
//         } else {

//             return config
//         }
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )

BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)

        const persistData = deepParseJson(rawPersistData)

        const accessToken = persistData.auth.session.token
        if (accessToken && accessToken.access) {
            config.headers[
                REQUEST_HEADER_AUTH_KEY
            ] = `${TOKEN_TYPE}${accessToken.access}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    async (error) => {
        // const { response } = error

        // if (response && unauthorizedCode.includes(response.status)) {
        //     store.dispatch(onSignOutSuccess())
        // }
        const {
            config,
            response: { status },
        } = error;
        if (status === 401) {
            // if (error.response.data.message === "expired") {
            if (true) {
                const originalRequest = config;

                const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
                const persistData = deepParseJson(rawPersistData)
                const token = persistData.auth.session.token
                const refreshToken = token.refresh

                // token refresh 요청

                try {
                    const { data } = await axios.post(
                        `${appConfig.API_BASE_URL}${appConfig.apiPrefix}/biz-user/auth/token/refresh/`, // token refresh api
                        { 'refresh': refreshToken },
                        // { headers: { authorization: `Bearer ${refreshToken}` } }
                    );
                    // 새로운 토큰 저장
                    // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
                    const { access: newAccessToken } = data;
                    // await localStorage.multiSet([
                    //     ["accessToken", newAccessToken],
                    // ]);

                    store.dispatch(
                        setUpdatedToken(
                            {
                                'access': newAccessToken,
                                'access_token_expired_at': moment().add(1, 'minute').format('yyyy-MM-DD HH:mm:ss')
                            }
                        )
                    )
                    originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
                    // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
                    return axios(originalRequest);
                } catch (err) {
                    if (status === 401) {
                        store.dispatch(onSignOutSuccess())
                    }
                }
            }
        }

        return Promise.reject(error)
    }
)

export default BaseService
