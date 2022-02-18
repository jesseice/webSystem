import request from "../util/request";
// 获取试题
export const getSubject = ()=>{
  return request({
    method:'GET',
    url:'/user/exam'
  })
}

// 提交答案
export const commitResult = data=>{
  return request({
    method:'POST',
    url:'/user/cmtresult',
    data
  })
}