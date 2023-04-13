import React, { useEffect, useState } from 'react'
import { AdaptableCard, Container, RichTextEditor, StickyFooter } from 'components/shared'
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
import { useNavigate } from 'react-router-dom'


export const categories = [
  { label: 'Bags', value: 'bags' },
  { label: 'Cloths', value: 'cloths' },
  { label: 'Devices', value: 'devices' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Watches', value: 'watches' },
]

injectReducer('bizData1', reducer)

const BizProfile = (props) => {
  // const BizProfile = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const bizKeyInfo = useSelector((state) => state.auth.session.bizKeyInfo)
  const bizData = useSelector((state) => state.bizData1.data.biz_info)


  const fetchData = async () => {
    if (!bizKeyInfo.bizId) {
      alert("오류입니다.")
      return;
    }
    try {
      const response = await apiGetBizInfo(bizKeyInfo.bizId)
      if (response.status == '200' && response.data) {
        // dispatch(setBizKeyInfo(
        //   {
        //     'name': response.data.name,
        //     'status': response.data.status,
        //     'bizId': response.data.id
        //   }
        // )
        // )
        dispatch(setBizInfo(response.data))
      } else {
        alert("매장정보 조회 중 에러가 발생했습니다.")
      }
    } catch (err) {
      alert("서버와의 통신 중 에러가 발생했습니다.")
    }
  }


  useEffect(() => {
    fetchData()
  }, [])



  return (
    <div className="h-full w-full">
      <h5 className="my-6">프로필</h5>
      <div className='flex justify-end px-10'>
        <Button onClick={() => { navigate('./edit') }}>
          편집
        </Button>
      </div>
      <div className="prose dark:prose-invert max-w-[800px]">
        <div className='flex flex-row mb-8'>
          <div className='font-semibold w-36'>매장명</div>
          <div>{bizData.name}</div>
        </div>
        <div className='flex flex-row mb-8'>
          <div className='font-semibold w-36'>전화번호</div>
          <div>{bizData.phone}</div>
        </div>

        <div className='flex flex-row mb-8'>
          <div className='font-semibold w-36'>매장주소</div>
          <p>{''}</p>
        </div>

        <div className='flex flex-row'>
          <div className='font-semibold w-36'>매장소개</div>
          <p>{bizData.introduction}</p>
        </div>
      </div>
    </div>
  )
}

export default BizProfile
