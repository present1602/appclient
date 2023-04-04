import appConfig from "configs/app.config";
import ApiService from "./ApiService";

export async function apiGetBizInfo(bizId) {
  return ApiService.fetchData({
    url: `${appConfig.apiPrefix}/biz-info/${bizId}`,
    method: 'GET',
  })
}