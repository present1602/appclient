import { FormContainer, FormItem, Input, InputGroup, Button, Checkbox, SingleCheckbox } from 'components/ui';
import Upload from 'components/ui/Upload';
import React, { useRef, useState } from 'react';
import AttachedImages from './AttachedImages';
import { setFileData, setRegData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux';
import AWS from 'aws-sdk'
import DirectUpload from './DirectUpload';
import SingleImageUpload from './SingleImageUpload';
import S3 from 'react-aws-s3';
import { apiUpdateBizReg, apiSaveBizFile } from 'services/BizRegService';

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
  const persistData = useSelector((state) => state.bizRegForm.data.formData)

  const dispatch = useDispatch()


  const [fileDataState] = useState(persistFileFormData)

  const [bizFile1, setBizFile1] = useState(null)

  const checkboxBizNameEqualRef = useRef()

  const s3_config = {
    bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
    dirName: 'bizfile',
    region: process.env.REACT_APP_AWS_S3_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  }

  const s3 = new AWS.S3()

  function onCheckBizNameEqual(value) {
    if (value === true) {
      const companyName = formData.company_name
      updateFields(
        { biz_name: companyName }
      )
    }
  }

  // const uploadFileToStorage = async (file) => {
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


  function callCompanyAddress() {
    const companyAddress = formData.company_address

    updateFields(
      { biz_address: companyAddress }
    )
  }


  function uploadFile(file) {
    const ReactS3Client = new S3(s3_config);
    return new Promise(resolve => {
      ReactS3Client
        .uploadFile(file, Math.trunc(Math.random() * 100000) + file.name)
        .then((data) => {
          resolve(data)

        })
        .catch(err => console.error(err))
    })
  }

  const onSaveBizSubInfo = async () => {
    if (!bizFile1 && !fileDataState.bizfile1.full_path) {
      alert("사업자등록증을 첨부해주세요")
      return;
    }
    const response = await apiUpdateBizReg(formData)

    if (response.status == '200') {
      dispatch(
        setRegData(formData)
      )

      try {
        const resData1 = await uploadFile(bizFile1)

        const getFilename = resData1.location.split('/')[resData1.location.split('/').length - 1]

        const params = {
          'original_filename': bizFile1.name,
          'biz_reg_id': persistData.id,
          'full_path': resData1.location,
          'filename': getFilename,
          'type': '10'
        }

        const fileResponse = await apiSaveBizFile(params)

        if (fileResponse.status == '200' && fileResponse.data) {
          dispatch(
            setFileData({ 'bizfile1': fileResponse.data })
          )

          alert("신청이 완료되었습니다.")
          moveNext()

        } else {
          alert("파일 업로드에 실패했습니다.")
        }
      } catch (err) {
        alert("오류입니다.")
        console.log("error : ", err)
      }



    }
  }

  console.log("save sub info")
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
      <SingleImageUpload
        fileData={fileDataState.bizfile1}
        fieldKey='bizfile1'
        file={bizFile1}
        setFile={setBizFile1}
      />

      {/* <FormItem label="영업허가증(선택)" />
      <DirectUpload
        fileData={fileDataState.bizfile2}
        fieldKey='bizfile2'
        setFileDataState={setFileDataState}
        onUploadCallback={onUploadCallback2}
      /> */}

      {/* <FormItem label="메뉴이미지" />
      <AttachedImages
      /> */}


      <div className='text-center'>
        <Button
          onClick={onSaveBizSubInfo}
          variant="solid"
          type="submit"
          className="mx-2"
        >
          완료
        </Button>
      </div>


    </FormContainer>
  );
}


export default BizSubInfo;