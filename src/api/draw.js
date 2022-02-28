import request from "../util/request";

export const createQ = (data)=>{
  return request({
    data,
    method:"POST",
    url:'user/createQ'
  })
}

export const getTag = ()=>{
  return request({
    method:"GET",
    url:'api/getTag'
  })
}