import React from 'react';
import DaumPostcode from "react-daum-postcode";
import { useDispatch, useSelector } from 'react-redux';
import { injectReducer } from 'store';
import reducer from '../store'
import { setFormData } from '../store/dataSlice'

injectReducer('bizRegForm', reducer)

const PopupPostCode = ({ onClose, updateFields }) => {
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

    updateFields({
      address1: data.address,
      address_type: data.addressType,
      sigungu_code: data.sigunguCode,
      postal_code: data.zonecode,
    })

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
    <>
      <button type='button' onClick={() => { onClose() }} className='postCode_btn'>닫기</button>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
    </>
  )
}

export default PopupPostCode;