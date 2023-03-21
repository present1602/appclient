import appConfig from "configs/app.config";
import ApiService from "./ApiService";

export async function getBizInfo(bizId) {
  return ApiService.fetchData({
    url: `${appConfig.apiPrefix}/`
  })
}