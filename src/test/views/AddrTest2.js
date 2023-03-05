import React, { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

const AddrTest2 = (props) => {

  const [showPopup, setShowPopup] = useState(false)
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return <div>
    <input type="button" onClick={() => setShowPopup(!showPopup)} value="열기" />
    {showPopup && <DaumPostcodeEmbed onComplete={handleComplete} {...props} />}
  </div>;

};

export default AddrTest2