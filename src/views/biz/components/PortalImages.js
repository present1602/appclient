import { Button, Dialog, Upload } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { HiEye } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { injectReducer } from 'store';
import reducer from 'store/auth';
import { getPortalImageData } from '../store/dataSlice';


const PortlImages = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const persistImages = useSelector((state) => state.bizPersistData.data.portal_images)
  const bizKeyInfo = useSelector((state) => state.auth.session.bizKeyInfo)

  const [selectedImg, setSelectedImg] = useState(persistImages.length > 0 ? persistImages[0] : {})
  const [viewOpen, setViewOpen] = useState(false)

  const onViewOpen = (img) => {
    setSelectedImg(img)
    setViewOpen(true)
  }

  useEffect(() => {
    if (bizKeyInfo.bizId) {
      dispatch(getPortalImageData(bizKeyInfo.bizId))
    }
  }, [dispatch])


  return (
    <>
      <h5 className='my-6'>포털 이미지</h5>
      <div className='flex justify-end px-10'>
        <Button onClick={() => navigate('./edit')}>편집</Button>
      </div>

      <div className='flex flex-row'>

        <div className='w-[120px]'>
          {persistImages.map((img) => (
            <div
              className="rounded border p-2"
              key={img.full_path}
            >
              <div>
                <img
                  onClick={() => { onViewOpen(img) }}
                  className="rounded max-h-[140px] max-w-full mx-auto"
                  src={img.full_path}
                  alt={img.filename}
                />
              </div>
            </div>))
          }
        </div>

        <div className='w-full'>
          <img src={selectedImg.full_path} className='max-h-[640px] max-w-full mx-auto' />
        </div>

      </div>

    </>

  );
}

export default PortlImages;