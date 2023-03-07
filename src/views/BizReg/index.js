import { Container } from 'components/shared'
import React, { useState, lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { injectReducer } from 'store'
import BizSubInfo from './components/BizSubInfo'
import PopupPostCode from './components/PopupPostCode'
import StepProgress from './components/StepProgress'
import reducer from './store'
import { setCurrentStep } from './store/stateSlice'
import { getBizReg, setFormData } from './store/dataSlice'


const BizRegForm = lazy(() => import('./components/BizRegForm'))

injectReducer('bizRegForm', reducer)

const BizReg = () => {
  const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false)
  const [addrDataKey, setAddrDataKey] = useState('company')

  const dispatch = useDispatch()

  const stepStatus = useSelector(
    (state) => state.bizRegForm.state.stepStatus
  )
  const currentStep = useSelector(
    (state) => state.bizRegForm.state.currentStep
  )
  const formData = useSelector((state) => state.bizRegForm.data.formData)

  function updateFields(fields) {
    dispatch(
      setFormData(fields)
      // setFormData(prevData => {
      //   return { ...prevData, ...fields }
      // })
    )
  }
  // function updatFileFields(fields) {
  //   dispatch(
  //     setFileData(fields)
  //   )
  // }

  const moveNext = () => {
    const nextStep = currentStep + 1
    dispatch(setCurrentStep(nextStep))
  }

  const movePrev = () => {
    const prevStep = currentStep - 1
    dispatch(setCurrentStep(prevStep))
  }

  // 팝업창 열기 
  const openAddressSearch = (addrKey) => {
    debugger;
    setAddrDataKey(addrKey)
    setIsAddressPopupOpen(true)

  }

  // 팝업창 닫기
  const closeAddressSearch = () => {
    setIsAddressPopupOpen(false)
  }

  useEffect(() => {
    dispatch(getBizReg())
  }, [])

  return (
    // <div className="app-layout-simple flex flex-auto flex-col h-[100vh]">
    //   <div className="h-full">

    //     <Container className="flex flex-col items-center min-w-0 h-full" >
    //       <div
    //         className="w-[320px] md:w-[480px] relative card card-border"
    //       // className="min-w-[320px] md:min-w-[450px] relative card card-border"
    //       // bodyClass="md:p-10"
    //       >
    <>
      {isAddressPopupOpen && (
        // <div style={{
        //   position: 'fixed', zIndex: 100, width: 'inherit',
        //   backgroundColor: 'rgba(0,0,0,0.3)', maxWidth: 'inherit', height: '100%'
        // }}>
        //   <div id="popupDom" style={{
        //     width: '100%',
        //     position: 'relative',
        //     top: '50%',
        //     transform: 'translate(0, -50%)'

        //   }}>
        <PopupPostCode onClose={closeAddressSearch} updateFields={updateFields}
          dataKey={addrDataKey} />
        //   </div>
        // </div>
      )}
      <div className="mb-8 p-8">
        <h3 className="mb-1">입점신청</h3>
        {
          <StepProgress currentStep={currentStep} />
        }
        {
          <Suspense fallback={<></>}>
            {currentStep === 0 && (
              <BizRegForm
                disableSubmit={false}
                openAddressSearch={() => openAddressSearch('company')}
                // setAddrDataKey={setAddrDataKey}
                // setIsAddressPopupOpen={setIsAddressPopupOpen}
                moveNext={moveNext}
                formData={formData}
                updateFields={updateFields}
              />
            )}
            {currentStep === 1 && (
              <BizSubInfo
                disableSubmit={false}
                openAddressSearch={() => openAddressSearch('biz')}
                // setAddrDataKey={setAddrDataKey}
                // setIsAddressPopupOpen={setIsAddressPopupOpen}
                moveNext={moveNext}
                formData={formData}
                // fileData={fileData}
                updateFields={updateFields}
              // updatFileFields={updatFileFields}
              />
              // <Identification
              //     data={formData.identification}
              //     onNextChange={handleNextChange}
              //     onBackChange={handleBackChange}
              //     currentStepStatus={currentStepStatus}
              // />
            )
            }
          </Suspense>
        }

      </div>
    </>
  )
}

export default BizReg