import { combineReducers } from 'redux'
import theme from './theme/themeSlice'
import auth from './auth'
import base from './base'
import biz from './biz/bizSlice'
// import locale from './locale/localeSlice'

const rootReducer = (asyncReducers) => (state, action) => {
    // const combinedReducer = combineReducers({
    //     theme,
    //     auth,
    //     base,
    //     locale,
    //     ...asyncReducers,
    // })
    const combinedReducer = combineReducers({
        theme,
        auth,
        base,
        biz,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}

export default rootReducer
