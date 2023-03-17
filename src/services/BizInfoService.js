import ApiService from "./ApiService"


export async function apiGetBizInfo(data) {
  return ApiService.fetchData({
    url: `${appConfig.apiPrefix}/biz_info/`,
    method: 'post',
    data
  })
}


// import ApiService from "./ApiService";
// import appConfig from "configs/app.config";

// export async function apiBizRegSave(data) {
//   return ApiService.fetchData({
//     url: `${appConfig.apiPrefix}/biz_reg/save/`,
//     method: 'post',
//     data
//   })
// }