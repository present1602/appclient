import { FormContainer, FormItem, Input, InputGroup, Button, Checkbox, SingleCheckbox } from 'components/ui';
import Upload from 'components/ui/Upload';
import React, { useRef, useState } from 'react';
import AttachedImages from './AttachedImages';
import { setFileData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux';
import DirectUpload from './DirectUpload';


const BizSubInfo = ({
  openAddressSearch,
  formData,
  // fileData,
  updateFields,
  // updatFileFields,
  moveNext
}) => {

  console.log("TEST11: " + process.env.REACT_APP_TEST1);
  console.log("REACT_APP_AWS_ACCESS_KEY_ID: " + process.env.REACT_APP_AWS_ACCESS_KEY_ID);

  const persistFileFormData = useSelector((state) => state.bizRegForm.data.fileData)
  const dispatch = useDispatch()

  const [fileDataState, setFileDataState] = useState(persistFileFormData)

  const checkboxBizNameEqualRef = useRef()

  function onCheckBizNameEqual(value) {
    if (value === true) {
      const companyName = formData.company_name
      updateFields(
        { biz_name: companyName }
      )
    }
  }

  // const uploadFileToStorage = async (file) => {
  //   debugger;
  //   const ReactS3Client = new S3(config);
  //   // the name of the file uploaded is used to upload it to S3
  //   ReactS3Client
  //     .uploadFile(file, file.name)
  //     .then((data) => {
  //       console.log(data.location);
  //     })
  //     .catch(err => console.error(err))
  // }

  // function onBizFile1Change(e) {
  //   const file = e.target.files[0]
  //   uploadFileToStorage(file)
  //   dispatch(
  //     setFileData(fields)
  //   )
  // }

  const onUploadCallback1 = (responseData, filename) => {
    setFileDataState({
      ...fileDataState, bizfile1: {
        path: responseData.key,
        full_path: responseData.location,
        filename: filename
      }
    }
    )
  }
  const onUploadCallback2 = (responseData, filename) => {
    setFileData({
      ...fileDataState, bizfile2: {
        path: responseData.key,
        full_path: responseData.location,
        filename: filename
      }
    })
  }

  function callCompanyAddress() {
    const companyAddress = formData.company_address

    updateFields(
      { biz_address: companyAddress }
    )
  }

  function updateFileFields(fields) {
    dispatch(
      setFileData(fields)
    )
  }

  const onSaveBizSubInfo = () => {
    console.log("save sub info")
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


      <FormItem label="사업자등록증" />
      <DirectUpload
        fileData={fileDataState.bizfile1}
        fieldKey='bizfile1'
        setFileDataState={setFileDataState}
        onUploadCallback={onUploadCallback1}
      />

      <FormItem label="영업허가증(선택)" />
      <DirectUpload
        fileData={fileDataState.bizfile2}
        fieldKey='bizfile2'
        setFileDataState={setFileDataState}
        onUploadCallback={onUploadCallback2}
      />
      <FormItem label="메뉴이미지" />
      <AttachedImages
      />

      <Button
        onClick={onSaveBizSubInfo}>
        완료
      </Button>

    </FormContainer>
  );
}


export default BizSubInfo;