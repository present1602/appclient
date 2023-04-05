import React from 'react'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from 'utils/hooks/useAuth'

const { unAuthenticatedEntryPath } = appConfig

const PrivateRoute = ({ children }) => {
    const { authenticated } = useAuth()

    // const { token, signedIn } = useSelector((state) => state.auth.session)
    const location = useLocation()

    if (!authenticated) {
        return (
            <Navigate
                to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
                replace
            />
        )
    }

    return <>{children}</>
    // return <Outlet />
}

export default PrivateRoute
