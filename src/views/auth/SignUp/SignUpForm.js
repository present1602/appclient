import React from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'

const validationSchema = Yup.object().shape({
    user_id: Yup.string().required('아이디를 입력해주세요'),
    email: Yup.string()
        .email('Invalid email'),
    password: Yup.string().required('비밀번호를 입력해주세요'),
    confirm_password: Yup.string().oneOf(
        [Yup.ref('password'), null],
        '비밀번호가 일치하지 않습니다'
    ),
})

const SignUpForm = (props) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (values, setSubmitting) => {
        const { user_id, password, email } = values
        setSubmitting(true)
        const result = await signUp({ user_id, password, email })

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
                initialValues={{
                    user_id: 'admin1',
                    password: '123Qwe1',
                    confirm_password: '123Qwe1',
                    email: 'test@testmail.com',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
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
                                invalid={errors.userName && touched.userName}
                                errorMessage={errors.userName}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="user_id"
                                    placeholder="아이디를 입력해주세요"
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
                                    placeholder="비밀번호를 입력해주세요"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                label="비밀번호 확인"
                                invalid={
                                    errors.confirm_password &&
                                    touched.confirm_password
                                }
                                errorMessage={errors.confirm_password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="confirm_password"
                                    placeholder="비밀번호를 다시 입력해주세요 "
                                    component={PasswordInput}
                                />
                            </FormItem>

                            <FormItem
                                label="이메일(선택)"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="이메일을 입력해주세요"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="휴대폰번호"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="text"
                                    placeholder="휴대폰번호를 입력해주세요"
                                    component={Input}
                                />
                            </FormItem>

                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="확인"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Sign Up'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>이미 계정이 있으신가요?? </span>
                                <ActionLink to={signInUrl}>로그인</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
