import React, { memo, useMemo, lazy, Suspense } from 'react'
import { Loading } from 'components/shared'
import { useSelector } from 'react-redux'
import {
  LAYOUT_TYPE_CLASSIC,
} from 'constants/theme.constant'
import useAuth from 'utils/hooks/useAuth'
// import useDirection from 'utils/hooks/useDirection'
// import useLocale from 'utils/hooks/useLocale'

const layouts = {
  [LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
  // [LAYOUT_TYPE_MODERN]: lazy(() => import('./ModernLayout')),
  // [LAYOUT_TYPE_STACKED_SIDE]: lazy(() => import('./StackedSideLayout')),
  // [LAYOUT_TYPE_SIMPLE]: lazy(() => import('./SimpleLayout')),
  // [LAYOUT_TYPE_DECKED]: lazy(() => import('./DeckedLayout')),
  // [LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
}

const Layout = () => {
  const layoutType = useSelector((state) => state.theme.layout.type)

  // const { authenticated } = useAuth()
  const authenticated = true

  // useDirection()

  // useLocale()

  const AppLayout = useMemo(() => {
    if (authenticated) {
      // return lazy(() => import('./ClassicLayout'))
      return layouts[LAYOUT_TYPE_CLASSIC]
    }
    return lazy(() => import('./AuthLayout'))
  }, [layoutType, authenticated])

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <Loading loading={true} />
        </div>
      }
    >
      <AppLayout />
      {/* <div>aaa</div> */}
    </Suspense>
  )
}

export default memo(Layout)