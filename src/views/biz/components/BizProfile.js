import React, { useEffect, useState } from 'react'
import { AdaptableCard, RichTextEditor, StickyFooter } from 'components/shared'
import { Input, h6, FormContainer, InputGroup, Button } from 'components/ui'
import { Field } from 'formik'
import GridImages from './GridImages'
import classNames from 'classnames'
import { injectReducer } from 'store'
import reducer from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { apiGetBizInfo } from 'services/BizService'
import { setBizInfo } from '../store/dataSlice'
import InfoRow from './InfoRow'


export const categories = [
  { label: 'Bags', value: 'bags' },
  { label: 'Cloths', value: 'cloths' },
  { label: 'Devices', value: 'devices' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Watches', value: 'watches' },
]

injectReducer('bizData1', reducer)

const BizProfile = ({ data }) => {
  // const BizProfile = (props) => {

  const dispatch = useDispatch()
  const bizKeyInfo = useSelector((state) => state.auth.session.bizKeyInfo)
  const bizData = useSelector((state) => state.bizData1.data.biz_info)


  useEffect(() => {
  }, [])



  return (
    <div className='max-w-[768px]'>


      <div className='flex flex-row'>
        <div className='font-semibold w-36'>전화번호</div>
        <p>{data.phone}</p>
      </div>

      <div className='flex flex-row'>
        <div className='font-semibold w-36'>매장주소</div>
        <p>{''}</p>
      </div>

      {/* <div className='flex flex-row'>
        <div className='font-semibold w-36'>한줄소개</div>
        <p>{data.introduction}</p>
      </div>

      <div className='flex flex-row'>
        <div className='font-semibold w-36'>매장소개</div>
        <p>{data.description}</p>
      </div> */}

      <GridImages />


    </div >
  )
}

export default BizProfile
