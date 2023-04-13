import React, { useEffect, useState } from 'react'
import { AdaptableCard, RichTextEditor, StickyFooter } from 'components/shared'
import { Input, FormItem, FormContainer, InputGroup, Button } from 'components/ui'
import { Field } from 'formik'
import GridImages from './GridImages'
import classNames from 'classnames'
import { injectReducer } from 'store'
import reducer from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { apiGetBizInfo } from 'services/BizService'
import { setBizInfo } from '../store/dataSlice'
import { setMode } from 'store/theme/themeSlice'
import { useNavigate } from 'react-router-dom'


{/* <FormContainer>
    <FormItem
        label="상호"
    >
        <Input
            value={formData.company_name}
            name="company_name"
            placeholder="사업자등록증 상의 상호를 입력해주세요"
            onChange={
                (e) => updateFields({ company_name: e.target.value })
            } />
    </FormItem> */}

injectReducer('bizData1', reducer)

const BizProfileEdit = (props) => {
  // const BizProfileEdit = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const bizData = useSelector((state) => state.bizData1.data.biz_info)
  const bizSession = useSelector((state) => state.auth.session.bizKeyInfo)


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

  const cancleEdit = () => {
    navigate('/biz/profile')
  }

  const fetchData = async () => {
    if (bizSession.bizId) {
      try {
        const response = await apiGetBizInfo(bizSession.bizId)
        if (response.status == '200' && response.data) {
          dispatch(setBizInfo(response.data))
        } else {
          alert("매장정보 조회 중 에러가 발생했습니다.")
        }
      } catch (err) {
        alert("서버와의 통신 중 에러가 발생했습니다.")
      }
    }
  }

  useEffect(() => {
    if (bizSession.status === '00') {
      setMode('new')
    }
    fetchData()
  }, [])

  useEffect(() => {
    setFormData(bizData)
  }, [bizData])

  return (
    <div className='max-w-[768px]'>
      <AdaptableCard className="mb-4" divider>
        {/* <h5>매장명</h5>

      <div
        className={classNames(
          'form-container',
        )}
      >
        <div className={'form-item'}>

        </div>

      </div> */}
        <h5 className='mb-5 mt-5'>
          {props.mode === 'new' ? '매장정보 등록' : '매장정보 수정'}
        </h5>

        <FormContainer>
          <FormItem
            label="매장명"
          >
            <Input
              value={formData.name || 'a'}
              name="name"
              placeholder="매장명을 입력해주세요"
              onChange={
                (e) => { }
              } />
          </FormItem>

          <FormItem
            label="전화번호">
            <Input
              value={formData.phone || ''}
              name="phone"
              placeholder="매장 전화번호를 입력해주세요"
              onChange={
                (e) => { }
              } />
          </FormItem>
          <FormItem
            label="매장소개">
            <RichTextEditor
              value={formData.company || ''}
              onChange={(val) => { }
                // updateFields({ 'description:': val })
              }
            />
          </FormItem>


          <FormItem
            label="사업장주소"
          >

            <InputGroup className="mb-4">

              <Input
                type="text"
                autoComplete="off"
                name="postal_code"
                placeholder="우편번호"
                value={formData.address?.postal_code || ''}
                onChange={
                  () => { }
                }
              />
              <Button
                type="button"
                onClick={openAddressSearch} >주소 찾기</Button>
            </InputGroup>
            <Input
              type="text"
              name="address1"
              value={formData.address?.address1 || ''}
              onChange={
                (e) => {
                  updateFields(
                    {
                      'address':
                        { ...formData.address, address1: e.target.value }
                    }
                  )
                }
              }
            />
            <Input
              type="text"
              name="address2"
              placeholder="상세주소를 입력해주세요"
              value={formData.address?.address2 || ''}
              onChange={
                (e) => {
                  updateFields(
                    {
                      'address':
                        { ...formData.address, address2: e.target.value }
                    }
                  )
                }
              }
            />
          </FormItem>

        </FormContainer>

        <GridImages />


        <div className="md:flex items-center">
          <Button
            size="sm"
            className="ltr:mr-3 rtl:ml-3"
            onClick={cancleEdit}
            type="button"

          >
            취소
          </Button>
          <Button
            loading={false}
            variant="solid"
            type="submit"
            className="mx-2"
            onClick={() => { }}
          >
            수정완료
          </Button>
        </div>
      </AdaptableCard>
    </div>
  )
}

export default BizProfileEdit
