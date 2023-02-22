
import React, { useState, Suspense, useEffect, useLocation } from 'react'
import { Tabs } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import BizDetail from './components/Detail'
import BizProfile from './components/BizProfile'

const { TabNav, TabList, TabContent } = Tabs

const BizView = () => {
  const [currentTab, setCurrentTab] = useState('profile')

  const navigate = useNavigate()

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
          <BizProfile />
        )}
        {currentTab === 'detail' && (
          <BizDetail />
        )}
      </Suspense>
      {/* <div className="p-4">
          <TabContent value="tab1">
            <p>
              If builders built buildings the way programmers
              wrote programs, then the first woodpecker that came
              along would destroy civilization. (Gerald Weinberg)
            </p>
          </TabContent>
          <TabContent value="tab2">
            <p>
              A computer lets you make more mistakes faster than
              any invention in human history–with the possible
              exceptions of handguns and tequila. (Mitch
              Radcliffe).
            </p>
          </TabContent>
          <TabContent value="tab3">
            <p>
              In C++ it’s harder to shoot yourself in the foot,
              but when you do, you blow off your whole leg.
              (Bjarne Stroustrup)
            </p>
          </TabContent>
        </div> */}
    </div >
  )
}

export default BizView


