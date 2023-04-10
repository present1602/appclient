import { Button } from 'components/ui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PromotionProgram = () => {

  const navigate = useNavigate()

  return (
    <div className="max-w-[768px]">
      {/* <h5 className='mb-6 mt-5'>매장정보 수정</h5> */}
      <Button
        onClick={() => { navigate('/promotion/register') }}
        size="sm">+ 프로모션 등록</Button>
    </div>
  );
}


export default PromotionProgram;