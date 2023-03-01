import React from 'react'
import BizRegForm from './BizRegForm'

const BizReg = () => {
  return (
    <>
      <div className="mb-8">
        <h3 className="mb-1">입점신청</h3>
        {/* <p>And lets get started with your free trial</p> */}
      </div>
      <BizRegForm disableSubmit={false} />
    </>
  )
}

export default BizReg