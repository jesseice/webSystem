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

// 获取不同题目数量
export const getSubNum = ()=>{
  return request({
    method:'GET',
    url:'/api/getSubNum'
  })
}