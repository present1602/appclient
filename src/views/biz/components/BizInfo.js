import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import BizProfile from './BizProfile'
import { setBizKeyInfo } from 'store/auth/sessionSlice'
import { useNavigate } from 'react-router-dom'


export const categories = [
  { label: 'Bags', value: 'bags' },
  { label: 'Cloths', value: 'cloths' },
  { label: 'Devices', value: 'devices' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Watches', value: 'watches' },
]

injectReducer('bizData1', reducer)

const BizInfo = (props) => {
  // const BizInfo = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const bizKeyInfo = useSelector((state) => state.auth.session.bizKeyInfo)
  const bizData = useSelector((state) => state.bizData1.data.biz_info)

  const iformData = {
    'name': '샐러드박스',
    'description': '신선한 재료와 다양한 메뉴',
    'phone': '032-555-1333',
    'address': {
      'address1': '인천 연수구 센트럴로 229',
      'address2': '삼일빌딩 333-11',
      'postal_code': '22004',
    },
  }
  const [formData, setFormData] = useState(bizData)

  function updateFields(fields) {
    setFormData(prevData => {
      return { ...prevData, ...fields }
    })
  }

  function openAddressSearch() { }


  // const fetchData = async () => {
  //   const response = await apiGetAccountSettingData()
  //   setData(response.data)
  // }

  // useEffect(() => {
  //     setCurrentTab(path)
  //     if (isEmpty(data)) {
  //         fetchData()
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

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

  const renderProfile = () => {
    if (bizKeyInfo.status === '00') {
      return <Button onClick={
        () => {
          navigate('/biz/update')
        }
      }>매장정보 등록하기</Button>
    }
    else if (['01', '10'].includes(bizKeyInfo.status)) {
      return <BizProfile data={bizData} />
    }
  }


  return (
    <>

      <div className='flex flex-row'>
        <div className='font-semibold w-36'>매장명</div>
        <div>{bizData.name}</div>
      </div>

      {/* {renderProfile()} */}

      <BizProfile data={bizData} />

    </>
  )
}

export default BizInfo
