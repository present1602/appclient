import React from 'react'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from 'utils/hooks/useAuth'
import { useSelector } from 'react-redux'

const { unAuthenticatedEntryPath, authenticatedEntryPath } = appConfig

const PrivateRoute = ({ children }) => {
    const { authenticated } = useAuth()
    const { bizKeyInfo } = useSelector((state) => state.auth.session)
    // const { token, signedIn } = useSelector((state) => state.auth.session)
    const location = useLocation()

    debugger;
    if (!authenticated) {
        return (
            <Navigate
                to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
                replace
            />
        )
    }
    else if (bizKeyInfo && bizKeyInfo.bizId) {
        return (
            <Navigate
                to={`${authenticatedEntryPath}`}
            />
        )
    }

    return <>{children}</>
    // return <Outlet />
}

export default PrivateRoute
