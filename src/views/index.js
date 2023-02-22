import React, { Suspense, useMemo } from 'react'
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
import UiTest from './UiTest'
import CollapseMenuItemView2 from './demo/CollapseMenuItemView2'
import CollapseMenuItemView1 from './demo/CollapseMenuItemView1'
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
  const ModernLayout2 = useMemo(() => {
    return <ModernLayout />
  })

  return (
    <Routes>
      <Route path='/uitest' key={'test.ui'} element={<UiTest />} />
      <Route path='/account' element={<AuthLayout />}>
        <Route path='sign-in' key={'account.sign-in'} element={<SignIn />} />
        <Route path='sign-up' key={'account.sign-up'} element={<SignUp />} />
        {/* <Route path='sign-in' key={'account.sign-in'} element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path='sign-up' key={'account.sign-up'} element={<PublicRoute><SignUp /></PublicRoute>} /> */}
      </Route>
      <Route path='/' element={<ModernLayout />}>
        {/* <Route path='home' key={'ui.home'} element={
          <Home />
        } />
        <Route path='single-menu-view' key={'ui.single-menu-view'} element={<SingleMenuView />} />
        <Route path='collapse-menu-item-view-2' key={'ui.single-menu-view'} element={<CollapseMenuItemView2 />} />
        <Route path='collapse-menu-item-view-1' key={'ui.single-menu-view'} element={<CollapseMenuItemView1 />} /> */}

        {/* {protectedRoutes.map(({ component: Component, key, path }) => {
          return <Route
            key={key}
            path={path}
            element={
              <Component />
            }
          />
        })} */}

        {protectedRoutes.map((route) => {
          return <Route
            key={route.path}
            path={route.path}
            element={
              <PageContainer {...props} {...route.meta}>
                <AppRoute
                  routeKey={route.key}
                  component={route.component}
                  {...route.meta}
                />
              </PageContainer>
            }
          />
        })}


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