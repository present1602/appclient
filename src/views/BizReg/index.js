import { Container } from 'components/shared'
import React, { useState, lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { injectReducer } from 'store'
import BizSubInfo from './components/BizSubInfo'
import PopupPostCode from './components/PopupPostCode'
import StepProgress from './components/StepProgress'
import reducer from './store'
import { setCurrentStep } from './store/stateSlice'
import { setRegData, setFileData } from './store/dataSlice'
import { apiGetBizReg } from 'services/BizRegService'
import appConfig from 'configs/app.config'
import RegReview from './components/RegReview'


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
  const persistData = useSelector((state) => state.bizRegForm.data.formData)

  const [formData, setFormData] = useState(persistData)

  function updateFields(fields) {
    setFormData(prevData => {
      return { ...prevData, ...fields }
    })
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
    setAddrDataKey(addrKey)
    setIsAddressPopupOpen(true)
  }

  // 팝업창 닫기
  const closeAddressSearch = () => {
    setIsAddressPopupOpen(false)
  }
  async function getRegData() {
    try {
      const response = await apiGetBizReg()
      const resData = response.data
      if (resData.result.state === 'new') {
        console.log("new write")
        return;
      }
      else if (resData.result === "success") {

        if (resData.state === "ongoing") {

          dispatch(setRegData(resData.data))

          if (resData.fileData && resData.fileData.bizfile1) {
            dispatch(
              setFileData(resData.fileData)
            )
          }

        } else if (resData.state === "submitted") {
          alert("입점신청 제출이 완료된 상태입니다. 신청서 확인 후 연락드리겠습니다")
          return;
        }
      }
      else if (resData.result === 'fail' && resData.error_code) {
        const msg = "서버에 요청 중 오류가 발생했습니다. \n에러코드 : " + resData.error_code
        if (resData.message) {
          msg += "\n" + resData.message
        }
        alert(msg)
        console.log(resData)
      }
    } catch (err) {
      // alert("서버 요청 오류입니다.")
      console.log('call apiGetBizReg err : ', err)
      window.location.href = appConfig.openEntryPath
    }
  }


  useEffect(() => {
    console.log("=====a==========")
    getRegData()
  }, [])

  useEffect(() => {
    setFormData(persistData)
  }, [persistData, currentStep])


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
              />
            )
            }
            {currentStep === 2 &&
              <RegReview />
            }
          </Suspense>
        }

      </div>
    </>
  )
}

export default BizReg