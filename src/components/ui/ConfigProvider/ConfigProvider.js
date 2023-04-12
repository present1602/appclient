import { createContext, useContext } from 'react'
import { SIZES } from '../utils/constant'

export const defaultConfig = {
    themeColor: 'grey',
    mode: 'light',
    primaryColorLevel: 800,
    cardBordered: false,
    controlSize: SIZES.MD,
    navMode: 'themed',
}
// export const defaultConfig = {
//     themeColor: 'indigo',
//     mode: 'light',
//     locale: 'en',
//     primaryColorLevel: 600,
//     cardBordered: false,
//     controlSize: SIZES.MD,
//     navMode: 'light',
// }

export const ConfigContext = createContext(defaultConfig)

const ConfigProvider = ConfigContext.Provider

export const ConfigConsumer = ConfigContext.Consumer

export function useConfig() {
    return useContext(ConfigContext)
}

export default ConfigProvider
