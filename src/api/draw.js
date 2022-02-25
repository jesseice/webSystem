import request from "../util/request";

export const createQ = (data)=>{
  return request({
    data,
    method:"POST",
    url:'user/createQ'
  })
}