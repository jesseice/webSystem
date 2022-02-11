import request from "../util/request";

// regist注册
export const registUser = data=>{
  return request({
    method:'POST',
    url:'/api/regist',
    data
  })
}