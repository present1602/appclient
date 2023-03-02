import React, { useState } from 'react'
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'

const validationSchema = Yup.object().shape({
    user_id: Yup.string().required('아이디를 입력해주세요'),
    password: Yup.string().required('비밀번호를 입력해주세요'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/auth/forgot-password',
        signUpUrl = '/auth/sign-up',
    } = props

    const [message, setMessage] = useTimeOutMessage()


    const { signIn, signOut } = useAuth()

    const onSignIn = async (values, setSubmitting) => {
        const { user_id, password } = values
        setSubmitting(true)

        const result = await signIn({ user_id, password })

        if (result.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                // Remove this initial value
                initialValues={{
                    user_id: 'bizuser13',
                    password: 'bizuser13!',
                    rememberMe: true,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="아이디"
                                invalid={errors.user_id && touched.user_id}
                                errorMessage={errors.user_id}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="user_id"
                                    placeholder="아이디"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="비밀번호"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="비밀번호"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <div className="flex justify-between mb-6">
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                    children="아이디 저장"
                                />
                                <ActionLink to={forgotPasswordUrl}>
                                    비밀번호를 잊으셨나요?
                                </ActionLink>
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="로그인"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>이미 계정이 있으신가요? </span>
                                <ActionLink to={signUpUrl}>회원가입</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
            {/* <button onClick={() => localStorage.removeItem('admin')}  >로그아웃</button> */}
            <button onClick={signOut}  >로그아웃</button>
        </div>
    )
}

export default SignInForm
