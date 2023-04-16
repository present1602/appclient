import { Button, CloseButton } from 'components/ui';
import React, { useRef, useState } from 'react';
import { HiEye } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { injectReducer } from 'store';
import { directUploadFile } from 'utils/uploadFile';
import reducer from '../store';
import { setPortalImages } from '../store/dataSlice';
import SortableList, { SortableItem } from 'react-easy-sort';




injectReducer('bizPersistData', reducer)
const PortlImagesEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const persistImages = useSelector((state) => state.bizPersistData.data.portal_images)


  const bizKeyInfo = useSelector((state) => state.auth.session.bizKeyInfo)

  const onSortEnd = (oldIndex, newIndex) => {

    let newArr = persistImages
    const targetItem = newArr[oldIndex]
    newArr = persistImages.filter((el, idx) => idx != oldIndex)

    newArr.splice(newIndex, 0, targetItem)

    dispatch(setPortalImages(newArr))

  }


  const fileRef = useRef()


  const removeFile = (index) => {
    const newArr = persistImages.filter((el, idx) => idx != index)
    dispatch(setPortalImages(newArr))
  }

  const handleFileUpload = async (e) => {
    const bizId = bizKeyInfo.bizId
    const file = e.target.files[0]

    const response = await directUploadFile(file, 'biz/portal')

    debugger;
    const newFileElement = {
      'full_path': response.location,
      'filename': `${bizId}_${Math.random()}_${file.name}`,
      'original_filename': file.name,
    }
    dispatch(setPortalImages([...persistImages, newFileElement]))

  }

  function handleFileButtonClick() {
    fileRef.current?.click()
  }

  return (
    <div className='h-full w-full'>
      <h5 className='my-6'>포털 이미지 수정</h5>
      <div className='flex justify-end my-1'>
        <Button onClick={() => { }} className='mx-1'>취소</Button>
        <Button onClick={() => { }} className='mx-1'>저장</Button>
      </div>

      <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
        {persistImages.map((item, index) => (
          <SortableItem key={item.filename}>
            <div className='upload-file w-full h-[120px] py-1 px-1' >
              <div className='flex w-full h-full'>
                <div className='h-full flex justify-center w-[180px]'>
                  <img src={item.full_path} className='h-full' />
                </div>
                <div className="upload-file-info">
                  <h6 className="upload-file-name">{item.filename}</h6>
                </div>
              </div>

              <div className="cursor-pointer z-50 border-red-100"
                onClick={
                  (e) => {
                    removeFile(index)
                  }
                }
              >
                <CloseButton
                  className="upload-file-remove"
                />
              </div>

            </div>
          </SortableItem>
        ))}
      </SortableList>

      <input type="file" ref={fileRef} onChange={handleFileUpload} className='upload-input' />
      <div className='upload-file w-full h-[120px] py-1 px-1'>
        <div className='flex w-full h-full' onClick={handleFileButtonClick}>
          <div className='h-full flex justify-center w-[180px] p-5'>
            <img src='/img/others/upload.png' className='h-full' />
          </div>
          <div className="upload-file-info">

            <h6 className="upload-file-name">이미지 추가</h6>
          </div>
        </div>
      </div>

    </div>
  );
}

export default PortlImagesEdit;