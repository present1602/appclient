import { Button } from 'components/ui';
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


  return (
    <div className='h-full w-full'>
      <h5 className='my-6'>포털 이미지 수정</h5>

      {persistImages.map((img) => (
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
              {/* <HiEye /> */}
              {img.filename}
            </span>
            <span
              onClick={() => { }}
              className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
            >
              {/* <HiTrash /> */}
            </span>
          </div>
        </div>
      ))}

    </div>
  );
}

export default PortlImagesEdit;