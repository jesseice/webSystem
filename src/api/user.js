import request from "@/util/request";

// 获取用户信息
export const getUserInfo = ()=>{
  return request({
    method:'GET',
    url:'/user/getInfo'
  })
}

// 获取用户好友列表
export const getFriendList = ()=>{
  return request({
    method:'GET',
    url:'/user/friend'
  })
}