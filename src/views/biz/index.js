import React, { useState, Suspense, useEffect, Fragment } from 'react'
import { Button, Drawer, Spinner, Tabs } from 'components/ui'
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import BizDetail from './components/Detail'
import BizProfile from './components/BizProfile'
import { useSelector } from 'react-redux'
import { injectReducer } from 'store'
import reducer from './store'
import BizInfo from './components/BizInfo'
import { AdaptableCard, Container, NavToggle } from 'components/shared'
import useThemeClass from 'utils/hooks/useThemeClass'

const { TabNav, TabList, TabContent } = Tabs



const routes = [
  {
    groupName: '매장정보',
    nav: [
      {
        path: 'profile',
        label: '프로필',
        component: React.lazy(() => import('./components/BizProfile')),
      },
      {
        path: 'portal-images',
        label: '매장이미지',
        component: React.lazy(() => import('./components/GridImages')),
      },
      {
        path: 'detail',
        label: '상세정보',
        component: React.lazy(() => import('./components/Detail')),
      },
      {
        path: 'grid',
        label: '그리드',
        component: React.lazy(() => import('./components/GridImages')),
      },
    ]
  }
]

const bizRoutes = [
  {
    groupName: '매장정보',
    nav: [
      {
        path: 'profile',
        label: '프로필',
        component: React.lazy(() => import('./components/BizProfile')),
      },
      {
        path: 'profile/edit',
        label: '기본정보 수정',
        component: React.lazy(() => import('./components/BizProfileEdit')),
      },
      {
        path: 'portal-images',
        label: '매장이미지',
        component: React.lazy(() => import('./components/PortalImages')),
      },
      {
        path: 'portal-images/edit',
        label: '매장이미지',
        component: React.lazy(() => import('./components/PortalImagesEdit')),
      },
      {
        path: 'detail',
        label: '상세정보',
        component: React.lazy(() => import('./components/Detail')),
      },
      {
        path: 'grid',
        label: '그리드',
        component: React.lazy(() => import('./components/GridImages')),
      },
    ]
  }
]


const NavContent = ({ onLinkClick, routes }) => {
  const { textTheme, borderTheme } = useThemeClass()

  const activeClass = `${textTheme} hover:${textTheme} ${borderTheme}`

  return (
    <>
      {routes.map((group) => (
        <div className="mb-6" key={group.groupName}>
          <h6 className="mb-4">{group.groupName}</h6>
          <div className="border-l border-gray-200 dark:border-gray-600">
            {group.nav.map((menu) => (
              <NavLink
                key={menu.label}
                className={({ isActive }) =>
                  `cursor-pointer font-semibold border-l px-4 h-6 mb-4 flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 ltr:-ml-px rtl:-mr-px ${isActive
                    ? activeClass
                    : 'border-transparent'
                  }`
                }
                to={menu.path}
                onClick={onLinkClick}
              >
                <span>{menu.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

const MobileNav = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openDrawer = () => {
    setIsOpen(true)
  }

  const onDrawerClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        className="lg:hidden"
        shape="circle"
        variant="plain"
        icon={<NavToggle className="text-2xl" toggled={isOpen} />}
        onClick={openDrawer}
      />
      <Drawer
        title="Navigation"
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        width={300}
        placement="left"
      >
        <NavContent onLinkClick={onDrawerClose} routes={routes} />
      </Drawer>
    </>
  )
}

injectReducer('bizPersistData', reducer)
const BizView = () => {
  const [currentTab, setCurrentTab] = useState('profile')

  const navigate = useNavigate()
  const bizSession = useSelector((state) => state.auth.session.bizKeyInfo)

  const location = useLocation()

  const path = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )

  // const bizMenu = {
  //   profile: { label: '매장정보', path: 'profile' },
  //   detail: { label: '상세정보', path: 'detail' },
  // }

  // const onTabChange = (val) => {
  //   setCurrentTab(val)
  //   navigate(`/biz/${val}`)
  // }

  useEffect(() => {

    // if (bizSession.status === '00') {
    //   navigate('/biz/update')
    // }

    // setCurrentTab(path)


  }, [])

  return (
    <Container className='h-full'>
      <AdaptableCard className="h-full" bodyClass="lg:flex h-full gap-8">
        <div className="lg:w-[180px] py-2 lg-py-0 px-4 mb-4 border border-gray-200 dark:border-gray-700 rounded-md lg:border-0">
          <div className="flex flex-col">
            <div className="hidden lg:block">
              <NavContent routes={routes} />
            </div>
            <MobileNav routes={routes} />
          </div>
        </div>
        <div className='h-full w-full'> {/* *w-full 추가 */}
          <Routes>
            {bizRoutes.map((group) => (
              <Fragment key={group.groupName}>
                {group.nav.map(({ path, component: Component, label }) => (
                  <Route
                    key={label}
                    path={path}
                    element={
                      <Suspense
                        fallback={
                          <div className="h-full w-full flex items-center justify-center">
                            <Spinner size={40} />
                          </div>
                        }
                      >

                        <Component />

                      </Suspense>
                    }
                  />
                ))}
              </Fragment>
            ))}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </div>
      </AdaptableCard>
    </Container>
    // <AdaptableCard bodyClass="gap-8">
    //   <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
    //     <TabList>
    //       {Object.keys(bizMenu).map((key) => (
    //         <TabNav key={key} value={key}>
    //           {bizMenu[key].label}
    //         </TabNav>
    //       ))}
    //     </TabList>
    //   </Tabs>

    //   <Suspense fallback={<></>}>
    //     {currentTab === 'profile' && (
    //       <BizInfo />
    //     )}
    //     {currentTab === 'detail' && (
    //       <BizDetail />
    //     )}
    //   </Suspense>
    // </AdaptableCard>
  )
}

// const BizView = () => {
//   const bizKeyInfo = useSelector((state) => state.auth.session.bizKeyInfo)
//   const navigate = useNavigate()
//   const renderContent = () => {
//     if (bizKeyInfo && bizKeyInfo.status && bizKeyInfo.status === '00') {
//       return <Button onClick={
//         () => {
//           navigate('/biz/update')
//         }
//       }>매장정보 등록하기</Button>
//     } else {
//       return <BizViewContent />
//     }
//   }

//   return (
//     <>
//       {renderContent()}
//     </>
//   )
// }

export default BizView


