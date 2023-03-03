import React, { useRef, useState, useCallback, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useConfig } from '../ConfigProvider'
import cloneDeep from 'lodash/cloneDeep'
import FileItem from './FileItem'
import Button from '../Buttons'
import CloseButton from '../CloseButton'
import Notification from '../Notification'
import toast from '../toast'
import AWS from 'aws-sdk';
import S3 from 'react-aws-s3';
import { ConfirmDialog } from 'components/shared'

window.Buffer = window.Buffer || require("buffer").Buffer;

const SingleUpload = React.forwardRef((props, ref) => {
    const {
        className,
        beforeUpload,
        accept,
        ...rest
    } = props

    const [file, setFile] = useState(null)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    // const [selectedFile, setSelectedFile] = useState(null);

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
                debugger;
                console.log(data.location);
                // setFile(data.location);
                // setSelectedFile(data.location);

                // setFile(file)

                // setDisplay(false);
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

    const onNewFileUpload = (e) => {
        const fileObj = e.target.files[0]
        let result = true

        if (beforeUpload) {
            // result = beforeUpload(newFiles, files)

            if (result === false) {
                triggerMessage()
                return
            }

            if (typeof result === 'string' && result.length > 0) {
                triggerMessage(result)
                return
            }
        }

        if (result) {
            setFile(fileObj)
            // onChange?.(updatedFiles, files)
        }
    }

    const removeFile = (fileIndex) => {

        setFile(null)
    }

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
        setFile(null)
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
                    onChange={onNewFileUpload}
                    // onChange={handleFileInput}
                    accept={accept}
                    title=""
                    value=""
                    // {...field}
                    {...rest}
                ></input>
                <Button disabled={false} onClick={(e) => e.preventDefault()}>
                    Upload
                </Button>
            </div>
            <div className="upload-file-list">
                {file &&
                    <FileItem file={file} key={`${file.name}`}>
                        <CloseButton
                            onClick={onDeleteConfirmation}
                            className="upload-file-remove"
                        />
                    </FileItem>
                }
            </div>
            <input type="button" onClick={uploadFile} value="업로드" />
        </>
    )
})

SingleUpload.propTypes = {
    uploadLimit: PropTypes.number,
    accept: PropTypes.string,
}

export default SingleUpload
