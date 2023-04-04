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
import DirectUploadFileItem from './DirectUploadFileItem'
import { useDispatch } from 'react-redux'

window.Buffer = window.Buffer || require("buffer").Buffer;

const DirectUpload = React.forwardRef((props, ref) => {
    const {
        className,
        beforeUpload,
        fileData,
        setFileDataState,
        fieldKey,
        onFileChange,
        onUploadCallback,
        accept,
        ...rest
    } = props

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const [fileState, setFileState] = useState(fileData)
    // const [selectedFile, setSelectedFile] = useState(null);

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
        // setSelectedFile(e.target.files[0]);
        if (e.target.files[0].name.length > 0) {
            uploadFile(e.target.files[0]);
        };
    }

    // useEffect(() => {
    //     alert("ue file")
    //     uploadFile(file)
    // }, [file])
    const uploadFile = async (file) => {
        const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
            .uploadFile(file, file.name)
            .then((data) => {
                // onUploadCallback(data, file.name)

                if (fieldKey === 'bizfile1') {
                    setFileDataState(
                        prevData => {
                            return {
                                ...prevData, 'bizfile1': {
                                    filename: file.name,
                                    path: data.key,
                                    full_path: data.location,
                                }
                            }
                        }
                    )
                } else if (fieldKey === 'bizfile2') {
                    setFileDataState(
                        prevData => {
                            return {
                                ...prevData, 'bizfile2': {
                                    filename: file.name,
                                    path: data.key,
                                    full_path: data.location,
                                }
                            }
                        }
                    )
                }
            })
            .catch(err => console.error(err))
    }



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
                <Button disabled={false}
                    onClick={(e) => e.preventDefault()}>
                    Upload
                </Button>
            </div>
            <div className="upload-file-list">
                {fileData?.full_path &&
                    // <img src={fileData?.full_path} width={"100px"} height={"100px"}
                    // />
                    <DirectUploadFileItem
                        type='image'
                        fileData={fileData}
                        key={`${fileData.full_path}`}>
                        <CloseButton
                            onClick={onDeleteConfirmation}
                            className="upload-file-remove"
                        />
                    </DirectUploadFileItem>
                }
            </div>
            <input type="button" onClick={uploadFile} value="업로드" />
        </>
    )
})

DirectUpload.propTypes = {
    uploadLimit: PropTypes.number,
    accept: PropTypes.string,
}

export default DirectUpload
