import React, { useState } from 'react'
import {
    AdaptableCard,
    ConfirmDialog,
    DoubleSidedImage,
} from 'components/shared'
import { FormItem, Dialog, Upload, Button } from 'components/ui'
import { HiEye, HiTrash } from 'react-icons/hi'
import { Field } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { useNavigate } from 'react-router-dom'

const ImageList = (props) => {
    const { imgList, onImageDelete } = props

    const [selectedImg, setSelectedImg] = useState({})
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const onViewOpen = (img) => {
        setSelectedImg(img)
        setViewOpen(true)
    }

    const onDialogClose = () => {
        setViewOpen(false)
        setTimeout(() => {
            setSelectedImg({})
        }, 300)
    }

    const onDeleteConfirmation = (img) => {
        setSelectedImg(img)
        setDeleteConfirmationOpen(true)
    }

    const onDeleteConfirmationClose = () => {
        setSelectedImg({})
        setDeleteConfirmationOpen(false)
    }

    const onDelete = () => {
        onImageDelete?.(selectedImg)
        setDeleteConfirmationOpen(false)
    }

    return (
        <>
            {imgList.map((img) => (
                <div
                    className="group relative rounded border p-2 flex"
                    key={img.id}
                >
                    <img
                        className="rounded max-h-[140px] max-w-full mx-auto"
                        src={img.img}
                        alt={img.name}
                    />
                    <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                        <span
                            onClick={() => onViewOpen(img)}
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                        >
                            <HiEye />
                        </span>
                        <span
                            onClick={() => onDeleteConfirmation(img)}
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                        >
                            <HiTrash />
                        </span>
                    </div>
                </div>
            ))}
            <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">{selectedImg.name}</h5>
                <img
                    className="w-full"
                    src={selectedImg.img}
                    alt={selectedImg.name}
                />
            </Dialog>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                onClose={onDeleteConfirmationClose}
                onRequestClose={onDeleteConfirmationClose}
                type="danger"
                title="Remove image"
                onCancel={onDeleteConfirmationClose}
                onConfirm={onDelete}
                confirmButtonColor="red-600"
            >
                <p> 파일을 삭제하시겠습니까? </p>
            </ConfirmDialog>
        </>
    )
}

const GridImages = (props) => {
    // const { values } = props
    const navigate = useNavigate()
    const [imgList, setImgList] = useState([])

    const beforeUpload = (file) => {
        let valid = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 10000000

        for (let f of file) {
            if (!allowedFileType.includes(f.type)) {
                valid = 'Please upload a .jpeg or .png file!'
            }

            if (f.size >= maxFileSize) {
                valid = '10MB 이하의 파일만 업로드 가능합니다'
            }
        }

        return valid
    }

    const onUpload = (files) => {
        let imageId = '1-img-0'
        const latestUpload = files.length - 1
        if (imgList.length > 0) {
            const prevImgId = imgList[imgList.length - 1].id
            const splitImgId = prevImgId.split('-')
            const newIdNumber = parseInt(splitImgId[splitImgId.length - 1]) + 1
            splitImgId.pop()
            const newIdArr = [...splitImgId, ...[newIdNumber]]
            imageId = newIdArr.join('-')
        }
        const image = {
            id: imageId,
            name: files[latestUpload].name,
            img: URL.createObjectURL(files[latestUpload]),
        }
        const imageList = [...imgList, ...[image]]
        console.log('imageList', imageList)
        setImgList(imageList)
        // form.setFieldValue(field.name, imageList)
    }

    const handleImageDelete = (deletedImg) => {
        let imgList = cloneDeep(imgList)
        imgList = imgList.filter((img) => img.id !== deletedImg.id)
    }

    return (
        <div className="h-full w-full">
            <h5 className="mb-6">매장이미지</h5>
            <div className='flex justify-end px-10'>
                <Button onClick={() => { navigate('./edit') }}>
                    편집
                </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                <ImageList
                    imgList={imgList}
                    onImageDelete={(img) =>
                        handleImageDelete(img)
                    }
                />
                <Upload
                    className="min-h-fit"
                    beforeUpload={beforeUpload}
                    onChange={(files) =>
                        onUpload(files)
                    }
                    showList={false}
                    draggable
                >
                    <div className="max-w-full flex flex-col px-4 py-2 justify-center items-center">
                        <DoubleSidedImage
                            src="/img/others/upload.png"
                            darkModeSrc="/img/others/upload-dark.png"
                        />
                        <p className="font-semibold text-center text-gray-800 dark:text-white">
                            업로드
                        </p>
                    </div>
                </Upload>
            </div>

        </div>
    )
}

export default GridImages
