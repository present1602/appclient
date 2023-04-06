import React, { useRef, useState, useCallback, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'
import Button from 'components/ui/Buttons'
import CloseButton from 'components/ui/CloseButton'
import Notification from 'components/ui/Notification'
import toast from 'components/ui/toast'
import AWS from 'aws-sdk';
import S3 from 'react-aws-s3';
import { ConfirmDialog } from 'components/shared'
import { setFileData, setFormData } from 'views/BizReg/store/dataSlice'
import { useDispatch } from 'react-redux'
import SingleUploadFileItem from './SingleUploadFileItem'

window.Buffer = window.Buffer || require("buffer").Buffer;

const SingleImageUpload = React.forwardRef((props, ref) => {
    const {
        className,
        beforeUpload,
        fileData,
        fieldKey,
        file,
        setFile,
        accept,
        ...rest
    } = props

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const dispatch = useDispatch()

    const fileInputField = useRef(null)
    // AWS.config.update(
    //     {
    //         region: process.env.REACT_APP_AWS_S3_REGION,
    //         accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    //         secretAccessKey: Process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    //     }
    // )
    const config = {
        bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
        dirName: 'bizfile',
        region: process.env.REACT_APP_AWS_S3_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    }

    const handleFileInput = (e) => {
        if (e.target.files[0].name.length > 0) {
            setFile(e.target.files[0])
        };
    }

    // useEffect(() => {
    //     alert("ue file")
    //     uploadFile(file)
    // }, [file])

    // const uploadFile = async (file) => {
    // const ReactS3Client = new S3(config);
    // ReactS3Client
    //     .uploadFile(file, file.name)
    //     .then((data) => {
    //         // onUploadCallback(data, file.name)

    //         if (fieldKey === 'bizfile1') {
    //             setFileDataState(
    //                 prevData => {
    //                     return {
    //                         ...prevData, 'bizfile1': {
    //                             filename: file.name,
    //                             path: data.key,
    //                             full_path: data.location,
    //                         }
    //                     }
    //                 }
    //             )
    //         } else if (fieldKey === 'bizfile2') {
    //             setFileDataState(
    //                 prevData => {
    //                     return {
    //                         ...prevData, 'bizfile2': {
    //                             filename: file.name,
    //                             path: data.key,
    //                             path: data.location,
    //                         }
    //                     }
    //                 }
    //             )
    //         }
    //     })
    //     .catch(err => console.error(err))
    // }



    const triggerMessage = (msg) => {
        toast.push(
            <Notification type="danger" duration={2000}>
                {msg || 'Upload Failed!'}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
    }

    // const onNewFileUpload = (e) => {
    //     const fileObj = e.target.files[0]

    //     // const original_filename = fileObj.name;

    //     let result = true

    //     if (beforeUpload) {
    //         // result = beforeUpload(newFiles, files)

    //         if (result === false) {
    //             triggerMessage()
    //             return
    //         }

    //         if (typeof result === 'string' && result.length > 0) {
    //             triggerMessage(result)
    //             return
    //         }
    //     }

    //     if (result) {
    //         setFile(fileObj)
    //         // onChange?.(updatedFiles, files)
    //     }
    // }

    // const removeFile = (fileIndex) => {
    //     setFile(null)
    // }

    const triggerUpload = (e) => {
        fileInputField.current?.click()
        e.stopPropagation()
    }


    const uploadClass = classNames(
        'upload',
        className
    )

    const uploadInputClass = classNames(
        'upload-input',
    )

    const onDeleteConfirmation = () => {
        // setSelectedImg(img)
        setDeleteConfirmationOpen(true)
    }


    const onDeleteConfirmationClose = () => {
        // setSelectedImg({})
        setDeleteConfirmationOpen(false)
    }
    const onDelete = () => {
        // setFile(null)
        if (fieldKey === 'bizfile1') {
            dispatch(
                setFileData({
                    'bizfile1': ''
                })
            )
        } else if (fieldKey === 'bizfile2') {
            dispatch(
                setFileData({
                    'bizfile2': ''
                })
            )
        }
        setDeleteConfirmationOpen(false)
    }

    function handleUploadClick() {

    }


    function renderFilePreview() {
        if (file) {
            return (
                <div className="upload-file">
                    <div className="flex">
                        <div className="upload-file-thumbnail">
                            <img
                                className="upload-file-image"
                                src={URL.createObjectURL(file)}
                                alt={`file preview`}
                            />
                        </div>
                        <div className="upload-file-info">
                            <h6 className="upload-file-name">{file.name}</h6>
                            {/* <span className="upload-file-size">kb</span> */}
                        </div>
                    </div>
                </div>
            )
        } else if (fileData?.full_path) {
            return (
                <div className="upload-file">
                    <div className="flex">
                        <div className="upload-file-thumbnail">
                            <img
                                className="upload-file-image"
                                src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${fileData.full_path}`}
                                alt={`file preview`}
                            />
                        </div>
                        <div className="upload-file-info">
                            <h6 className="upload-file-name">{fileData.filename}</h6>
                        </div>
                    </div>
                </div>
            )
        }
    }
    return (
        <>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                onClose={onDeleteConfirmationClose}
                onRequestClose={onDeleteConfirmationClose}
                type="danger"
                title="파일 삭제"
                onCancel={onDeleteConfirmationClose}
                onConfirm={onDelete}
                confirmButtonColor="red-600"
            >
                <p> 파일을 삭제하시겠습니까? </p>
            </ConfirmDialog>
            <div
                ref={ref}
                className={uploadClass}
                onClick={triggerUpload}
                {...rest}
            >
                <input
                    className={uploadInputClass}
                    type="file"
                    ref={fileInputField}
                    // onChange={onFileChange}
                    onChange={handleFileInput}
                    accept={accept}
                    title=""
                    value=""
                    // {...field}
                    {...rest}
                ></input>

                {renderFilePreview()}

                <Button disabled={false}
                    onClick={(e) => e.preventDefault()}>
                    파일 찾기
                </Button>
            </div>


            {/* {fileData?.full_path &&
                    // <img src={fileData?.full_path} width={"100px"} height={"100px"}
                    // />
                    <SingleUploadFileItem
                        type='image'
                        fileData={fileData}
                        key={`${fileData.full_path}`}>
                        <CloseButton
                            onClick={onDeleteConfirmation}
                            className="upload-file-remove"
                        />
                    </SingleUploadFileItem>
                } */}
            {/* <input type="button" onClick={handleUploadClick} value="업로드2" /> */}
        </>
    )
})

SingleImageUpload.propTypes = {
    uploadLimit: PropTypes.number,
    accept: PropTypes.string,
}

export default SingleImageUpload
