import { Button, CloseButton } from 'components/ui';
import React from 'react';
import { HiEye } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { injectReducer } from 'store';
import reducer from '../store';

injectReducer('bizPersistData', reducer)
const PortlImagesEdit = () => {
  const navigate = useNavigate()
  const persistImages = useSelector((state) => state.bizPersistData.data.portal_images)

  const removeFile = (index) => {

  }

  return (
    <div className='h-full w-full'>
      <h5 className='my-6'>포털 이미지 수정</h5>
      <div className='flex justify-end my-1'>
        <Button onClick={() => { }} className='mx-1'>취소</Button>
        <Button onClick={() => { }} className='mx-1'>저장</Button>
      </div>
      {persistImages.map((img, index) => (
        <div className='upload-file w-full h-[120px] py-1 px-1'>
          <div className='flex w-full h-full'>
            <div className='h-full flex justify-center w-[180px]'>
              <img src={img.full_path} className='h-full' />
            </div>
            <div className="upload-file-info">
              {/* <h6 className="upload-file-name">{name}</h6> */}
              <h6 className="upload-file-name">{img.filename}</h6>
            </div>
          </div>
          <CloseButton
            onClick={() => removeFile(index)}
            className="upload-file-remove"
          />
        </div>

      ))}

      <div className='upload-file w-full h-[120px] py-1 px-1'>
        <div className='flex w-full h-full' onClick={() => { }}>
          <div className='h-full flex justify-center w-[180px] p-5'>
            <img src='/img/others/upload.png' className='h-full' />
          </div>
          <div className="upload-file-info">

            <h6 className="upload-file-name">이미지 추가</h6>
          </div>
        </div>
      </div>

      {/* {persistImages.map((img) => (
        <div
          className="group relative rounded border p-2 flex"
          key={img.full_path}
        >
          <img
            className="rounded max-h-[140px] max-w-full mx-auto"
            src={img.full_path}
            alt={img.filename}
          />
          <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
            <span
              onClick={() => { }}
              className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
            >
              {img.filename}
            </span>
            <span
              onClick={() => { }}
              className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
            >
            </span>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default PortlImagesEdit;