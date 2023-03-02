import React from 'react'
import { Steps } from 'components/ui'
import { useDispatch } from 'react-redux'
import { setCurrentStep } from '../store/stateSlice'
const Progress = ({ currentStep }) => {

    const dispatch = useDispatch()

    const onStepChange = (stepIndex) => {
        dispatch(setCurrentStep(stepIndex))
    }
    return (
        <div>
            <Steps current={currentStep}>
                <Steps.Item title="사업자정보" onStepChange={() => onStepChange(0)} />
                <Steps.Item title="매장부가정보" onStepChange={() => onStepChange(1)} />
                <Steps.Item title="신청완료" onStepChange={() => onStepChange(2)} />
            </Steps>
        </div>
    )
}

export default Progress
