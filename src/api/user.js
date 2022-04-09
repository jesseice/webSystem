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

// 获取个人题库信息
export const getPrivateTopic = ()=>{
  return request({
    method:'GET',
    url:'/user/private/topic'
  })
}

// 收藏题目至个人题库
export const collectTopic = data =>{
  return request({
    method:"POST",
    url:'/user/collect/topic',
    data
  })
}

// 判断该题是否被收藏
export const hasCollection = data =>{
  return request({
    method:"POST",
    url: '/user/has/collect',
    data
  })
}

// 搜索好友
export const findFriend = param =>{
  return request({
    method:"GET",
    url: `/user/find/friend?user_name=${param}`,
  })
}