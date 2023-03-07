import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiBizRegSave, apiGetBizReg } from 'services/BizRegService'

export const getBizReg = createAsyncThunk(
    'bizRegForm/data/getBizReg',
    async () => {
        const response = await apiGetBizReg()
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'bizRegForm/data',
    initialState: {
        formData: {
            id: '',
            company_name: 'company01',
            owner_name: '오일사',
            official_biz_number: '9993335551',
            official_biz_category1: '업종01',
            official_biz_category2: '업종02',
            comment: '',
            owner_type: '10',
            biz_tax_type: '10',
            company_address: {
                address1: 'addr1',
                address2: 'addr2',
                address_type: 'R',
                postal_code: '0',
                sigungu_code: '1',
            },
            biz_name: '포케원데이01',
            // address: {
            //     address1: 'add1',
            //     address2: '',
            //     jibun_address: '',
            //     road_address: '',
            //     address_type: 'R',
            //     sigungu_code: '',
            //     postal_code: '',
            // },
        },
        fileData: {
            bizfile1: '',
            bizfile2: null,
            attached_file_list: []
        },
        mode: 'new'
    },
    reducers: {
        setFormData: (state, action) => {
            debugger;
            state.formData = { ...state.formData, ...action.payload }
        },
    },
    extraReducers: {
        [getBizReg.fulfilled]: (state, action) => {
            const payload = action.payload
            if (payload.result === "success") {

                if (payload.state === "ongoing") {
                    state.formData = payload.data
                    state.mode = payload.state
                } else if (payload.state === "submitted") {
                    alert("입점신청 제출이 완료된 상태입니다. 신청서 확인 후 연락드리겠습니다")
                    return;
                }

            }

            // state.stepStatus = action.payload.formStatus
        },
    },
})

export const { setFormData, setStepStatus } = dataSlice.actions

export default dataSlice.reducer
