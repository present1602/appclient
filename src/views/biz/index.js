
import React, { useState, Suspense, useEffect } from 'react'
import { Button, Tabs } from 'components/ui'
import { useLocation, useNavigate } from 'react-router-dom'
import BizDetail from './components/Detail'
import BizProfile from './components/BizProfile'
import { useSelector } from 'react-redux'
import { injectReducer } from 'store'
import reducer from './store'
import BizInfo from './components/BizInfo'

const { TabNav, TabList, TabContent } = Tabs

injectReducer('bizData', reducer)
const BizView = () => {
  const [currentTab, setCurrentTab] = useState('profile')

  const navigate = useNavigate()
  const bizData = useSelector((state) => state.bizData.data.biz_info)

  const location = useLocation()

  const path = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )

  const bizMenu = {
    profile: { label: '매장정보', path: 'profile' },
    detail: { label: '상세정보', path: 'detail' },
  }

  const onTabChange = (val) => {
    setCurrentTab(val)
    navigate(`/biz/${val}`)
  }

  useEffect(() => {

    if (bizData.status === '00') {
      navigate('/biz/update')
    }

    setCurrentTab(path)


    // if (isEmpty(data)) {
    //     fetchData()
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
        <TabList>
          {Object.keys(bizMenu).map((key) => (
            <TabNav key={key} value={key}>
              {bizMenu[key].label}
            </TabNav>
          ))}
        </TabList>
      </Tabs>

      <Suspense fallback={<></>}>
        {currentTab === 'profile' && (
          <BizInfo />
        )}
        {currentTab === 'detail' && (
          <BizDetail />
        )}
      </Suspense>
    </div >
  )
}

// const BizView = () => {
//   const bizKeyInfo = useSelector((state) => state.auth.session.bizKeyInfo)
//   const navigate = useNavigate()
//   debugger;
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


