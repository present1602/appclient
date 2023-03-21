import React, { useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
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
    'biz_name': '',
    'description': '',
    'biz_address': {
      'adress1': '',
      'adress2': '',
      'postal_code': '',
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

      <FormContainer>
        <FormItem
          label="매장명"
        >
          <Input
            value={formData.biz_name}
            name="company_name"
            placeholder="사업자등록증 상의 상호를 입력해주세요"
            onChange={
              (e) => { }
            } />
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
    </AdaptableCard>
    // <AdaptableCard className="mb-4" divider>
    //   <h5>Basic Information</h5>
    //   <p className="mb-6">Section to config basic product information</p>
    //   <FormItem
    //     label="Product Name"
    //   // invalid={errors.name && touched.name}
    //   // errorMessage={errors.name}
    //   >
    //     <Field
    //       type="text"
    //       autoComplete="off"
    //       name="name"
    //       placeholder="Name"
    //       component={Input}
    //     />
    //   </FormItem>
    //   <FormItem
    //     label="Code"
    //   // invalid={errors.productCode && touched.productCode}
    //   // errorMessage={errors.productCode}
    //   >
    //     <Field
    //       type="text"
    //       autoComplete="off"
    //       name="productCode"
    //       placeholder="Code"
    //       component={Input}
    //     />
    //   </FormItem>
    //   <FormItem
    //     label="Description"
    //     labelClass="!justify-start"
    //   // invalid={errors.description && touched.description}
    //   // errorMessage={errors.description}
    //   >
    //     <Field name="description">
    //       {({ field, form }) => (
    //         <RichTextEditor
    //           value={field.value}
    //           onChange={(val) =>
    //             form.setFieldValue(field.name, val)
    //           }
    //         />
    //       )}
    //     </Field>
    //   </FormItem>

    //   <GridImages />
    // </AdaptableCard>
  )
}

export default BizProfile
