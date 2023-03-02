import ApiService from "./ApiService";
import appConfig from "configs/app.config";

export async function apiBizRegSave(data) {
  return ApiService.fetchData({
    url: `${appConfig.apiPrefix}/biz_reg/save`,
    method: 'post',
    data
  })
}

export async function apiGetBizReg(data) {
  return ApiService.fetchData({
    url: `${appConfig.apiPrefix}/biz_reg/`,
    method: 'get',
    data
  })
}