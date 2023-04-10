import { Button } from 'components/ui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PromotionRegister = () => {

  const navigate = useNavigate()

  return (
    <div>
      <h5>프로모션 등록</h5>
      <Button onClick={() => navigate('/promotion/package-dc/new')}

      >
        패키지할인
      </Button>
    </div>
  );
}

export default PromotionRegister; 