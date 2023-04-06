import React from 'react';

const RegReview = () => {
  return (
    <div className="text-center">
      {/* <DoubleSidedImage
        className="mx-auto mb-8"
        src="/img/others/welcome.png"
        darkModeSrc="/img/others/welcome-dark.png"
        alt="Welcome"
    /> */}
      <h3 className="mb-8 mt-8">
        입점신청이 완료되었습니다.
      </h3>
      <p className="text-base">
        신청해주셔서 감사합니다.
        신청결과는 빠르게 안내드리도록 하겠습니다.
      </p>
      {/* <div className="mt-8 max-w-[350px] mx-auto">
        <Button className="mb-2" variant="solid" onClick={onNext} block>
            Get started
        </Button>
        <Button variant="plain" onClick={onSkip} block>
            
        </Button>
    </div> */}
    </div>
  );
}

export default RegReview;