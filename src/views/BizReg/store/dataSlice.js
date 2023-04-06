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
            official_biz_number: '999333001',
            official_biz_category1: 'c01',
            official_biz_category2: 'c02',
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
            biz_address: {
                address1: 'bizaddr1',
                address2: 'bizaddr2',
                address_type: 'R',
                postal_code: '0',
                sigungu_code: '1',
            },
            comment: ''
        },

        fileData: {
            bizfile1: {
                'full_path': ''
            },
            bizfile2: {
                'full_path': ''
            },
            attached_file_list: []
        },
        mode: 'new'
    },
    reducers: {
        setRegData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload }
        },
        setFileData: (state, action) => {
            state.fileData = { ...state.fileData, ...action.payload }
        },
    },
    extraReducers: {
        [getBizReg.fulfilled]: (state, action) => {
            const payload = action.payload
            if (payload.result.state === 'new') {
                return;
            }
            else if (payload.result === "success") {

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

export const { setRegData, setStepStatus, setFileData } = dataSlice.actions

export default dataSlice.reducer
