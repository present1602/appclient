
import React, { useState, Suspense, useEffect, useLocation } from 'react'
import { Tabs } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import BizDetail from './components/Detail'
import BizProfile from './components/BizProfile'

const { TabNav, TabList, TabContent } = Tabs

const BizView1 = () => {

  return (
    <div>
      <h3>biz view1</h3>
    </div >
  )
}

export default BizView1


