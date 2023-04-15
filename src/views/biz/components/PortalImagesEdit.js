import { Button, CloseButton } from 'components/ui';
import React, { useRef, useState } from 'react';
import { HiEye } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { injectReducer } from 'store';
import { directUploadFile } from 'utils/uploadFile';
import reducer from '../store';
import { setPortalImages } from '../store/dataSlice';
import { closestCenter, DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

injectReducer('bizPersistData', reducer)
const PortlImagesEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const persistImages = useSelector((state) => state.bizPersistData.data.portal_images)

  const [languages, setLanguages] = useState(['css', 'js', 'python', 'node'])
  const [sample, setSample] = useState(
    [
      { 'id:': 'a1', 'text:': 'css' },
      { 'id:': 'a2', 'text:': 'node' },
      { 'id:': 'a3', 'text:': 'js' },
      { 'id:': 'a4', 'text:': 'typescript' },
    ]
    // 'js', 'python', 'node']
  )
  // const [fileListData, setFileListData] = useState(persistImages)

  const bizKeyInfo = useSelector((state) => state.auth.session.bizKeyInfo)

  const fileRef = useRef()

  const [items, setItems] = useState([
    {
      id: "1",
      name: "Manoj"
    },
    {
      id: "2",
      name: "John"
    },
    {
      id: "3",
      name: "Ronaldo"
    },
    {
      id: "4",
      name: "Harry"
    },
    {
      id: "5",
      name: "Jamie"
    }
  ])

  const sensors = [useSensor(PointerSensor)];

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

    const newFileElement = {
      'full_path': response.location,
      'filename': `${bizId}_${Math.random()}_${file.name}`,
      'original_filename': file.name,
    }
    debugger;
    // setFileListData([...fileListData, newFileElement])
    dispatch(setPortalImages([...persistImages, newFileElement]))

  }

  function handleFileButtonClick() {
    fileRef.current?.click()
  }

  function handleDragEnd(e) {
    debugger;
    console.log("Drag end called");
    const { active, over } = e;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
        // items: [2, 3, 1]   0  -> 2
        // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1] 
      });

    }

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
          items={persistImages.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {
            persistImages.map(
              item => <SortableItem {...item} key={item.id} removeFile={removeFile} />
            )
          }
        </SortableContext>
      </DndContext>

      {/* <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={persistImages}
          strategy={verticalListSortingStrategy}
        >
          {persistImages.map((img, index) => <SortableItems key={img.filename} id={img.filename} img={img} />)}
        </SortableContext>
      </DndContext>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={persistImages}
          strategy={verticalListSortingStrategy}
        >
          {persistImages.map((img, index) => {
            return <SortableItem key={`${index}_${img.filename}`} id={`${index}_${img.filename}`} data={img} removeFile={removeFile} index={index} />
          }
          )}
        </SortableContext>
      </DndContext> */}

      {/* <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={persistImages}
          strategy={verticalListSortingStrategy}
        >
          {persistImages.map((img, index) => <SortableItem data={img} index={index} key={img.filename} id={img.filename} />)}
        </SortableContext>
      </DndContext> */}

      {/* <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={persistImages}
          strategy={verticalListSortingStrategy}
        >
          {persistImages.map((img, index) => (
            <SortableItem data={img} removeFile={removeFile} id={`${index}_${img.filename}`} index={index} />
          ))}
        </SortableContext>
      </DndContext> */}

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