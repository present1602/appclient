import React, { useState } from 'react'
import { Input, Button, FormItem, FormContainer, Alert, Select } from 'components/ui'
import { ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { apiBizRegSave } from 'services/BizRegService'
import InputGroup from 'components/ui/InputGroup'
import PopupDom from './PopupDom'
import PopupPostCode from './PopupPostCode'
import reducer from '../store'
import { injectReducer } from 'store'
import { useSelector } from 'react-redux'

injectReducer('bizRegForm', reducer)

const validationSchema = Yup.object().shape({
    company_name: Yup.string().required('회사이름을 입력해주세요'),
})

const taxOptions = [
    { value: '10', label: '일반과세자' },
    { value: '11', label: '간이과세자' },
    { value: '20', label: '법인과세자' },
]

const ownerOptions = [
    { value: '10', label: '개인대표' },
    { value: '20', label: '공동대표' },
]

const BizRegForm = (props) => {
    const { disableSubmit = false, className, setIsAddressPopupOpen, moveNext } = props

    // const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const formData = useSelector((state) => state.bizRegForm.data.formData)
    // const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false)

    // // 팝업창 열기
    const openAddressSearch = () => {
        setIsAddressPopupOpen(true)
    }

    // 팝업창 닫기
    const closeAddressSearch = () => {
        setIsAddressPopupOpen(false)
    }

    const onSaveBizReg = async (values, setSubmitting) => {
        // const { user_id, password, email, phone, name } = values
        setSubmitting(true)
        try {
            values['address1'] = formData.address1
            values['postal_code'] = formData.postal_code
            values['address_type'] = formData.address_type
            values['sigungu_code'] = formData.sigungu_code

            const result = await apiBizRegSave(values)
            debugger;
            if (result.status === 'failed') {
                setMessage(result.message)
            }
            if (result.status == '200') {

                moveNext()
                // setMessage(result.message)
            }


        } catch (err) {
            console.log("on save bizreg err : ", err)
        } finally {

            setSubmitting(false)
        }

    }

    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}

            {/* {isAddressPopupOpen && (
                <PopupDom>
                    <PopupPostCode onClose={closeAddressSearch} />
                </PopupDom>
            )} */}

            <Formik
                initialValues={formData}
                // initialValues={{
                //     company_name: 'company1',
                //     biz_name: '포케원데이1',
                //     official_biz_number: '1113335551',
                //     official_biz_category1: '업종1',
                //     official_biz_category2: '업종2',
                //     biz_tax_type: '10',
                //     owner_type: '10',
                //     owner_name: '이일',
                //     address: {
                //         address1: '인천시 연수구 송도동',
                //         address2: '애비뉴상가 100-10',
                //         jibun_address: '',
                //         road_address: '',
                //         address_type: 'R',
                //         postal_code: '22001',
                //         sigungu_code: '',
                //     }
                // }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSaveBizReg(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="상호"
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="company_name"
                                    placeholder="사업자등록증 상의 상호를 입력해주세요"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="사업자등록번호"
                            >
                                <Field
                                    autoComplete="off"
                                    name="official_biz_number"
                                    placeholder="사업자등록번호를 입력해주세요"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="업태"
                            >
                                <Field
                                    autoComplete="off"
                                    name="official_biz_category1"
                                    placeholder="한글로만 입력해주세요"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="종목"
                            >
                                <Field
                                    autoComplete="off"
                                    name="official_biz_category2"
                                    placeholder="한글로만 입력해주세요"
                                    component={Input}
                                />
                            </FormItem>
                            {/* <Field name="taxResident">
                                {({ field, form }) => (
                                    <Select
                                        placeholder="Tax resident of"
                                        field={field}
                                        form={form}
                                        options={countryList}
                                        value={countryList.filter(
                                            (country) =>
                                                country.value ===
                                                values.taxResident
                                        )}
                                        onChange={(country) =>
                                            form.setFieldValue(
                                                field.name,
                                                country.value
                                            )
                                        }
                                    />
                                )}
                            </Field> */}
                            <FormItem
                                label="과세구분"
                            >
                                <Field name='biz_tax_type'>
                                    {({ field, form }) => (
                                        <Select
                                            isSearchable={false}
                                            placeholder="과세유형을 선택해주세요"
                                            field={field}
                                            form={form}
                                            options={taxOptions}
                                            value={taxOptions.filter(
                                                (option) =>
                                                    option.value ===
                                                    values?.biz_tax_type
                                            )}
                                            onChange={(option) => {
                                                // debugger;
                                                form.setFieldValue(
                                                    field.name,
                                                    option.value
                                                )
                                            }
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            {/* <Select
                                    isSearchable={false}
                                    placeholder="과세유형을 선택해주세요"
                                    options={taxOptions}
                                // size="sm"
                                // options={colorList}
                                // components={{
                                //     Option: CustomSelectOption,
                                //     Control: CustomControl,
                                // }}
                                // value={colorList.filter((color) => color.value === themeColor)}
                                // onChange={onThemeColorChange}
                                /> */}
                            <FormItem
                                label="대표자 구분"
                            >
                                <Select
                                    isSearchable={false}
                                    options={ownerOptions}
                                    defaultValue={ownerOptions[0]}
                                />
                            </FormItem>

                            <FormItem
                                label="대표자성명"
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="owner_name"
                                    placeholder="사업자등록증 상의 대표자 이름을 입력해주세요"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="사업장주소"
                            >

                                <InputGroup className="mb-4">
                                    {/* <Input
                                        name="postal_code"
                                        // value={formData.postal_code}
                                        placeholder="우편번호"
                                    /> */}
                                    {/* <Field
                                        type="text"
                                        autoComplete="off"
                                        name="postal_code"
                                        placeholder="우편번호"
                                        component={Input}
                                    /> */}
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="postal_code"
                                        placeholder="우편번호"
                                        component={Input}
                                        value={formData.postal_code}
                                        onChange={
                                            () => { }
                                        }
                                    />
                                    <Button
                                        type="button"
                                        onClick={openAddressSearch} >주소 찾기</Button>
                                </InputGroup>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="address1"
                                    placeholder=""
                                    value={formData.address1}
                                    component={Input}
                                />
                                {/* <input t소 */}
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="address2"
                                    placeholder="상세주소를 입력해주세요"
                                    component={Input}
                                />
                            </FormItem>

                            {/* <FormItem
                                label="대표자생년월일"
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder=""
                                    component={Input}
                                />
                            </FormItem> */}
                            <div className='text-center'>
                                {/* <Button
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    className="mx-2"
                                >
                                    {isSubmitting
                                        ? '저장중입니다'
                                        : '임시저장'}
                                </Button> */}

                                <Button
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    className="mx-2"
                                >
                                    {isSubmitting
                                        ? '저장중입니다'
                                        : '저장 후 다음 단계로 이동'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default BizRegForm
