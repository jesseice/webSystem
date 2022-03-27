import request from "@/util/request";

export const getUserInfo = ()=>{
  return request({
    method:'GET',
    url:'/user/getInfo'
  })
}