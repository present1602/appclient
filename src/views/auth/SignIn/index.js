import React from 'react'
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">로그인 MEMBER</h3>
                <p>로그인 정보를 입력해주세요</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
