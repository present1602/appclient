import { Button, CloseButton } from 'components/ui';
import React, { useRef, useState } from 'react';
import { HiEye } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { injectReducer } from 'store';
import { directUploadFile } from 'utils/uploadFile';
import reducer from '../store';
import { setPortalImages } from '../store/dataSlice';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';


class MyPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown',
      handler: ({ nativeEvent: event }) => {
        if (
          event.target.classList.contains('close-btn')
          // !event.isPrimary ||
          // event.button !== 0 ||
          // isInteractiveElement(event.target)
        ) {
          return false;
        }

        return true;
      },
    },
  ];
}

function isInteractiveElement(element) {
  const interactiveElements = [
    'button',
    'input',
    'textarea',
    'select',
    'option',
  ];

  if (interactiveElements.includes(element.tagName.toLowerCase())) {
    return true;
  }

  return false;
}


injectReducer('bizPersistData', reducer)
const PortlImagesEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const persistImages = useSelector((state) => state.bizPersistData.data.portal_images)


  const bizKeyInfo = useSelector((state) => state.auth.session.bizKeyInfo)

  const fileRef = useRef()

  // const sensors = [useSensor(MyPointerSensor)];

  // const sensors = [useSensor(PointerSensor)];
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  }))

  const handleDragEnd2 = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = persistImages.findIndex(item => item.id === active.id)
      const newIndex = persistImages.findIndex(item => item.id === over.id)

      const newArr = arrayMove(persistImages, oldIndex, newIndex)

      dispatch(setPortalImages(newArr))
    }
  }

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
    // setFileListData([...fileListData, newFileElement])
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd2}
      >
        <SortableContext
          // items={persistImages.map(item => item.id)}
          items={persistImages}
          strategy={verticalListSortingStrategy}
        >
          {
            persistImages.map(
              (item, index) => <SortableItem
                id={`${index}_`}
                {...item} key={item.original_filename} removeFile={removeFile} index={index} />
            )
          }
        </SortableContext>
      </DndContext>


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