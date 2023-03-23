import ApiService from "./ApiService";
import appConfig from "configs/app.config";

export async function apiBizRegSave(data) {
  return ApiService.fetchData({
    url: `${appConfig.apiPrefix}/biz-reg/save/`,
    method: 'post',
    data
  })
}

export async function apiUpdateBizReg(data) {
  return ApiService.fetchData({
    url: `${appConfig.apiPrefix}/biz-reg/save/`,
    method: 'put',
    data
  })
}


export async function apiGetBizReg() {
  return ApiService.fetchData({
    url: `${appConfig.apiPrefix}/biz-reg/ongoing/`,
    method: 'get'
  })
}