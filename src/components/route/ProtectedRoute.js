import React from 'react'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from 'utils/hooks/useAuth'
import { useSelector } from 'react-redux'

const { unAuthenticatedEntryPath, openEntryPath } = appConfig

const ProtectedRoute = ({ children }) => {
    const { authenticated } = useAuth()
    const { token, signedIn } = useSelector((state) => state.auth.session)
    const { bizId } = useSelector((state) => state.biz)

    const location = useLocation()
    debugger
    if (!authenticated) {

        return (
            <Navigate
                to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
                replace
            />
        )
    } else if (!bizId) {
        window.location.href = `${openEntryPath}`
    }

    return <>{children}</>
    // return <Outlet />
}

export default ProtectedRoute
