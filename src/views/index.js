import React, { Suspense } from 'react'
import { Loading } from 'components/shared'
import { protectedRoutes, publicRoutes } from 'configs/routes.config'
import appConfig from 'configs/app.config'
import PageContainer from 'components/template/PageContainer'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from 'components/route/ProtectedRoute'
import PublicRoute from 'components/route/PublicRoute'
import AuthorityGuard from 'components/route/AuthorityGuard'
import AppRoute from 'components/route/AppRoute'
import ModernLayout from 'components/layout/ModernLayout'
import Home from './Home'
import SingleMenuView from './demo/SingleMenuView'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
// const ModernLayout = React.lazy(() => import('components/layout/ModernLayout'))
const AuthLayout = React.lazy(() => import('components/layout/AuthLayout'))

const { authenticatedEntryPath } = appConfig

const AllRoutes = (props) => {
  const userAuthority = useSelector((state) => state.auth.user.authority)
  //   {
  //     key: 'home',
  //     path: 'home',
  //     component: React.lazy(() => import('views/Home')),
  //     authority: [],
  // },
  // {
  //     key: 'singleMenuItem',
  //     path: 'single-menu-view',
  //     component: React.lazy(() => import('views/demo/SingleMenuView')),
  //     authority: [],
  // },
  return (
    <Routes>
      <Route path={'/account'} element={<AuthLayout />}>
        <Route path='sign-in' element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path='sign-up' element={<PublicRoute><SignUp /></PublicRoute>} />
      </Route>
      <Route path='/' element={<ModernLayout />}>
        <Route path='home' element={<Home />} />
        <Route path='single-menu-view' element={<SingleMenuView />} />
      </Route>
    </Routes>
  )
}

const Views = (props) => {
  return (
    <Suspense fallback={<Loading loading={true} />}>
      <AllRoutes {...props} />
    </Suspense>
  )
}

export default Views


// import React, { Suspense } from 'react'
// import { Loading } from 'components/shared'
// import { protectedRoutes, publicRoutes } from 'configs/routes.config'
// import appConfig from 'configs/app.config'
// import PageContainer from 'components/template/PageContainer'
// import { Routes, Route, Navigate, useRoutes } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import ProtectedRoute from 'components/route/ProtectedRoute'
// import PublicRoute from 'components/route/PublicRoute'
// import AuthorityGuard from 'components/route/AuthorityGuard'
// import AppRoute from 'components/route/AppRoute'
// import ModernLayout from 'components/layout/ModernLayout'
// import Home from './Home'
// import SingleMenuView from './demo/SingleMenuView'
// import SignIn from './auth/SignIn'
// import SignUp from './auth/SignUp'
// // const ModernLayout = React.lazy(() => import('components/layout/ModernLayout'))
// const AuthLayout = React.lazy(() => import('components/layout/AuthLayout'))

// const { authenticatedEntryPath } = appConfig



// const Views = (props) => {

//   const routes = useRoutes([
//     {
//       path: '/',
//       element: <ModernLayout />,
//       children: [
//         { element: <Navigate to="/" />, index: true },
//         { path: 'home', element: <Home /> },
//         { path: 'single-menu-view', element: <SingleMenuView /> },
//       ],
//     },
//     {
//       path: '/sign-in',
//       element: <AuthLayout />,
//       children: [
//         { path: '', element: <PublicRoute><SignIn /></PublicRoute> },
//         { path: '', element: <PublicRoute><SignUp /></PublicRoute> },
//       ]
//     }
//   ])
//   return routes;

//   // return (
//   //   <AllRoutes />
//   //   // <Suspense fallback={<Loading loading={true} />}>
//   //   //   <AllRoutes {...props} />
//   //   // </Suspense>
//   // )
// }

// export default Views