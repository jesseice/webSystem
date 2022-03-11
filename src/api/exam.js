import request from "../util/request";
// 获取试题
export const getSubject = data=>{
  return request({
    method:'POST',
    url:'/user/exam',
    data
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