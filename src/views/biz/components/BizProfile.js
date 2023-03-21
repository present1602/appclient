import React, { useState } from 'react'
import { AdaptableCard, RichTextEditor, StickyFooter } from 'components/shared'
import { Input, FormItem, FormContainer, InputGroup, Button } from 'components/ui'
import { Field } from 'formik'
import GridImages from './GridImages'
import classNames from 'classnames'

export const categories = [
  { label: 'Bags', value: 'bags' },
  { label: 'Cloths', value: 'cloths' },
  { label: 'Devices', value: 'devices' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Watches', value: 'watches' },
]
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
const BizProfile = (props) => {

  const iformData = {
    'biz_name': '샐러드박스',
    'description': '신선한 재료와 다양한 메뉴',
    'phone': '032-555-1333',
    'biz_address': {
      'address1': '인천 연수구 센트럴로 229',
      'address2': '삼일빌딩 333-11',
      'postal_code': '22004',
    },
  }
  const [formData, setFormState] = useState(iformData)

  function updateFields(fields) {
    setFormState(prevData => {
      return { ...prevData, ...fields }
    })
  }

  function openAddressSearch() { }


  return (
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
      <h5 className='mb-6 mt-5'>매장정보 수정</h5>

      <FormContainer>
        <FormItem
          label="매장명"
        >
          <Input
            value={formData.biz_name}
            name="biz_name"
            placeholder="매장명을 입력해주세요"
            onChange={
              (e) => { }
            } />
        </FormItem>

        <FormItem
          label="전화번호">
          <Input
            value={formData.phone}
            name="phone"
            placeholder="매장 전화번호를 입력해주세요"
            onChange={
              (e) => { }
            } />
        </FormItem>
        <FormItem
          label="매장소개">
          <RichTextEditor
            value={formData.description}
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
              value={formData.biz_address.postal_code}
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
            value={formData.biz_address.address1}
            onChange={
              (e) => {
                updateFields(
                  {
                    'biz_address':
                      { ...formData.biz_address, address1: e.target.value }
                  }
                )
              }
            }
          />
          <Input
            type="text"
            name="address2"
            placeholder="상세주소를 입력해주세요"
            value={formData.biz_address.address2}
            onChange={
              (e) => {
                updateFields(
                  {
                    'biz_address':
                      { ...formData.biz_address, address2: e.target.value }
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
          onClick={() => { }}
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
  )
}

export default BizProfile
