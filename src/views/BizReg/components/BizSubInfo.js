import { FormContainer, FormItem, Input, InputGroup, Button, Checkbox, SingleCheckbox } from 'components/ui';
import Upload from 'components/ui/Upload';
import SingleUpload from 'components/ui/Upload/SingleUpload';
import React, { useRef } from 'react';
import AttachedImages from './AttachedImages';


const BizSubInfo = ({
  openAddressSearch,
  formData,
  updateFields,
  updatFileFields,
  moveNext
}) => {

  console.log("TEST11: " + process.env.REACT_APP_TEST1);
  console.log("REACT_APP_AWS_ACCESS_KEY_ID: " + process.env.REACT_APP_AWS_ACCESS_KEY_ID);

  const checkboxBizNameEqualRef = useRef()

  function onCheckBizNameEqual(value) {
    if (value === true) {
      const companyName = formData.company_name
      updateFields(
        { biz_name: companyName }
      )
    }
  }


  function callCompanyAddress() {
    const companyAddress = formData.company_address
    debugger;
    updateFields(
      { biz_address: companyAddress }
    )
  }

  return (
    <FormContainer>
      <FormItem
        label="매장명"
      >
        <div>
          <Checkbox
            onChange={onCheckBizNameEqual}
            ref={checkboxBizNameEqualRef}
          >
            <div
              className='px-3'>
              회사명(사업자등록증 상의 상호)과 동일
            </div>

          </Checkbox>
        </div>

        <Input
          type="text"
          name="biz_name"
          placeholder="매장명을 입력해주세요"
          value={formData.biz_name}
          onChange={
            (e) => {
              if (checkboxBizNameEqualRef.current.value != 'true') {
                updateFields({ biz_name: e.target.value })
              }
            }
          }
        />

      </FormItem>
      <FormItem
        label="사업장주소"
      >
        <div>
          <Button size="xs"
            onClick={callCompanyAddress}
          >사업자등록증 주소 불러오기</Button>
        </div>


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


      <FormItem label="사업자등록증 singleupload" />
      <SingleUpload />

      <FormItem label="영업허가증(선택)" />
      {/* <SingleUpload updatFileFields={updatFileFields} /> */}

      <FormItem label="메뉴이미지" />
      {/* <Upload /> */}

      <AttachedImages />

    </FormContainer>
  );
}


export default BizSubInfo;