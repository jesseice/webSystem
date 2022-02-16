import request from "../util/request";
// 获取试题
export const getSubject = ()=>{
  return request({
    method:'GET',
    url:'/user/exam'
  })
}