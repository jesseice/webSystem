import request from "../util/request";

//  注册
export const registUser = data => {
  return request({
    method: 'POST',
    url: '/api/regist',
    data
  })
}