import { FormContainer, FormItem } from 'components/ui';
import Upload from 'components/ui/Upload';
import SingleUpload from 'components/ui/Upload/SingleUpload';
import React from 'react';
import AttachedImages from './AttachedImages';


const BizSubInfo = () => {

  console.log("TEST11: " + process.env.REACT_APP_TEST1);
  console.log("REACT_APP_AWS_ACCESS_KEY_ID: " + process.env.REACT_APP_AWS_ACCESS_KEY_ID);
  return (
    <FormContainer>
      <FormItem label="사업자등록증 singleupload" />
      <SingleUpload />

      <FormItem label="영업허가증(선택)" />
      <SingleUpload />

      <FormItem label="메뉴이미지" />
      {/* <Upload /> */}

      <AttachedImages />

    </FormContainer>
  );
}


export default BizSubInfo;