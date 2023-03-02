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


const SingleUpload = React.forwardRef((props, ref) => {
    const {
        className,
        beforeUpload,
        accept,
        ...rest
    } = props

    const [file, setFile] = useState(null)

    const fileInputField = useRef(null)

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

    return (
        <>
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
                    <FileItem file={file} key={file.name}>
                        <CloseButton
                            onClick={() => removeFile()}
                            className="upload-file-remove"
                        />
                    </FileItem>
                }
            </div>
        </>
    )
})

SingleUpload.propTypes = {
    uploadLimit: PropTypes.number,
    accept: PropTypes.string,
}

export default SingleUpload
