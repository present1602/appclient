import React from 'react';
import DaumPostcode from "react-daum-postcode";
import { useDispatch, useSelector } from 'react-redux';
import { injectReducer } from 'store';
import reducer from '../store'
import { setFormData } from '../store/dataSlice'

injectReducer('bizRegForm', reducer)

const PopupPostCode = ({ onClose, updateFields, dataKey }) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용

  // const formData = useSelector((state) => state.bizRegForm.data.formData)

  const dispatch = useDispatch()

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(data)
    console.log(fullAddress)
    console.log(data.zonecode)

    if (dataKey === 'company') {
      updateFields({
        'company_address': {
          address1: data.address,
          address_type: data.addressType,
          sigungu_code: data.sigunguCode,
          postal_code: data.zonecode,
          address2: ''
        }
      })
    } else if (dataKey === 'biz') {
      updateFields({
        'biz_address': {
          address1: data.address,
          address_type: data.addressType,
          sigungu_code: data.sigunguCode,
          postal_code: data.zonecode,
          address2: ''
        }
      })
    }
    // updateFields({
    // address1: data.address,
    // address_type: data.addressType,
    // sigungu_code: data.sigunguCode,
    // postal_code: data.zonecode,
    // })

    onClose()

    // dispatch(
    //   setFormData({
    //     address1: data.address,
    //     address_type: data.addressType,
    //     sigungu_code: data.sigunguCode,
    //     postal_code: data.zonecode,
    //   })
    // )


    // ...state,
    // categories: {
    //   ...state.categories,
    //   Professional: {
    //     ...state.categories.Professional,
    //     active: true
    //   }
    // }
  }

  const postCodeStyle = {
    // display: "block",
    // position: "absolute",
    // width: "100%",
    height: '600px',
    padding: "7px",
  };

  return (
    <div style={{
      position: 'fixed', zIndex: 100, width: 'inherit',
      backgroundColor: 'rgba(0,0,0,0.3)', maxWidth: 'inherit', height: '100%'
    }}>
      <div id="popupDom" style={{
        width: '100%',
        position: 'relative',
        top: '50%',
        transform: 'translate(0, -50%)'

      }}>
        <button type='button' onClick={() => { onClose() }} className='postCode_btn'>닫기</button>
        <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      </div>
    </div>
  )
}

export default PopupPostCode;