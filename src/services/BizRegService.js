import ApiService from "./ApiService";
import appConfig from "configs/app.config";

export async function bizRegSave(data) {
  return ApiService.fetchData({
    url: `${appConfig.apiPrefix}/biz_reg/save`,
    method: 'post',
    data
  })
}