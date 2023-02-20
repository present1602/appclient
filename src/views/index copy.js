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
// const ModernLayout = React.lazy(() => import('components/layout/ModernLayout'))
const AuthLayout = React.lazy(() => import('components/layout/AuthLayout'))

const { authenticatedEntryPath } = appConfig

const AllRoutes = (props) => {
  const userAuthority = useSelector((state) => state.auth.user.authority)

  return (
    <Routes>
      <Route path='/' element={<ModernLayout />}>
        <Route path='home' element={<Home />} />
        <Route path='single-menu-view' element={<SingleMenuView />} />

        {protectedRoutes.map((route, index) => (
          <Route
            key={route.key + index}
            path={route.path}
            element={
              // <Suspense fallback={<></>}>
              // <ProtectedRoute>
              <PageContainer {...props} {...route.meta}>
                <AppRoute
                  routeKey={route.key}
                  component={route.component}
                  {...route.meta}
                />
              </PageContainer>
              // </ProtectedRoute>
              // </Suspense>
            }
          />
        ))}
      </Route>

      {/* <Route path='/' element={<ModernLayout />}>
        {protectedRoutes.map((route, index) => (
          <Route
            key={route.key + index}
            path={route.path}
            element={
              // <Suspense fallback={<></>}>
              // <ProtectedRoute>
              <PageContainer {...props} {...route.meta}>
                <AppRoute
                  routeKey={route.key}
                  component={route.component}
                  {...route.meta}
                />
              </PageContainer>
              // </ProtectedRoute>
              // </Suspense>
            }
          />
        ))}
      </Route> */}

      {/* <Route
          path="/"
          element={<Navigate replace to={authenticatedEntryPath} />}
        /> */}


      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AuthLayout>
                <AppRoute
                  routeKey={route.key}
                  component={route.component}
                  {...route.meta}
                />
              </AuthLayout>
            }
          />
        ))}
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
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import ProtectedRoute from 'components/route/ProtectedRoute'
// import PublicRoute from 'components/route/PublicRoute'
// import AuthorityGuard from 'components/route/AuthorityGuard'
// import AppRoute from 'components/route/AppRoute'
// const ModernLayout = React.lazy(() => import('components/layout/ModernLayout'))
// const AuthLayout = React.lazy(() => import('components/layout/AuthLayout'))

// const { authenticatedEntryPath } = appConfig

// const AllRoutes = (props) => {
//   const userAuthority = useSelector((state) => state.auth.user.authority)

//   return (
//     <Routes>
//       <Route path='/' element={<ProtectedRoute><ModernLayout>
//         </ModernLayout></ProtectedRoute>} >
//         {/* <Route
//           path="/"
//           element={<Navigate replace to={authenticatedEntryPath} />}
//         /> */}
//         {protectedRoutes.map((route, index) => (
//           <Route
//             key={route.key + index}
//             path={route.path}
//             element={
//               // <AuthorityGuard
//               //   userAuthority={userAuthority}
//               //   authority={route.authority}
//               // >
//               <Suspense fallback={<></>}>
//                 {/* <ModernLayout> */}
//                 <PageContainer {...props} {...route.meta}>
//                   <AppRoute
//                     routeKey={route.key}
//                     component={route.component}
//                     {...route.meta}
//                   />
//                 </PageContainer>
//                 {/* </ModernLayout> */}
//               </Suspense>
//               // </AuthorityGuard> 
//             }
//           />
//         ))}
//       </Route>

//       <Route path="*" element={<Navigate to="/" replace />} />
//       <Route path="/" element={<PublicRoute />}>
//         {publicRoutes.map((route) => (
//           <Route
//             key={route.path}
//             path={route.path}
//             element={
//               <AuthLayout>
//                 <AppRoute
//                   routeKey={route.key}
//                   component={route.component}
//                   {...route.meta}
//                 />
//               </AuthLayout>
//             }
//           />
//         ))}
//       </Route>
//     </Routes>
//   )
// }

// const Views = (props) => {
//   return (
//     <Suspense fallback={<Loading loading={true} />}>
//       <AllRoutes {...props} />
//     </Suspense>
//   )
// }

// export default Views
