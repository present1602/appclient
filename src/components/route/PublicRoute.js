import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import appConfig from 'configs/app.config'
import useAuth from 'utils/hooks/useAuth'

const { authenticatedEntryPath } = appConfig

const PublicRoute = ({ children }) => {
    const { authenticated } = useAuth()

    // return authenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />
    return authenticated ? <Navigate to={authenticatedEntryPath} /> : <>{children}</>
}

export default PublicRoute
