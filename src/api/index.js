import { registUser } from './regist';
import { login } from './login'
import { getSubject, commitResult, getSubNum } from './exam'
import { createQ, getTag } from './draw'
import { getUserInfo, getFriendList, getPrivateTopic, collectTopic, hasCollection } from './user'

export default {
  registUser, // 注册
  login,
  getSubject,
  commitResult,
  getSubNum,
  createQ,
  getTag,
  getUserInfo,
  getFriendList,
  getPrivateTopic,
  collectTopic,
  hasCollection
}