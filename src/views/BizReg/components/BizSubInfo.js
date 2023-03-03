import { FormContainer, FormItem } from 'components/ui';
import Upload from 'components/ui/Upload';
import SingleUpload from 'components/ui/Upload/SingleUpload';
import React from 'react';
import AttachedImages from './AttachedImages';


const BizSubInfo = () => {
  return (
    <FormContainer>
      <FormItem label="사업자등록증 singleupload" />
      <SingleUpload />

      <FormItem label="영업허가증(선택)" />
      <Upload />

      <FormItem label="메뉴이미지" />
      {/* <Upload /> */}

      <AttachedImages />

    </FormContainer>
  );
}


export default BizSubInfo;