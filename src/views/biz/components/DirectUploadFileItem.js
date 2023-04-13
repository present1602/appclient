import React from 'react'
import { VscFilePdf, VscFileZip, VscFile } from 'react-icons/vsc'


const FileIcon = ({ children }) => {
    return <span className="text-4xl">{children}</span>
}

const DirectUploadFileItem = (props) => {
    const { type, fileData, children } = props
    const { filename = 'a', path } = fileData

    const renderThumbnail = () => {
        const isImageFile = type === 'image'

        if (isImageFile) {
            return (
                <img
                    className="upload-file-image"
                    src={path} // process.env.REACT_APP_ASSETS_BASE_URL + ..
                    alt={`file preview`}
                />
            )
        }

        if (type === 'application/zip') {
            return (
                <FileIcon>
                    <VscFileZip />
                </FileIcon>
            )
        }

        if (type === 'application/pdf') {
            return (
                <FileIcon>
                    <VscFilePdf />
                </FileIcon>
            )
        }

        return (
            <FileIcon>
                <VscFile />
            </FileIcon>
        )
    }

    return (
        <div className="upload-file">
            <div className="flex">
                <div className="upload-file-thumbnail">{renderThumbnail()}</div>
                <div className="upload-file-info">
                    <h6 className="upload-file-name">{filename}</h6>
                </div>
            </div>
            {children}
        </div>
    )
}

export default DirectUploadFileItem
