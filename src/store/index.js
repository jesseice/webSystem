// 引入vue、vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 引入封装好的localstorage函数
import { getItem,setItem, removeItem } from '@/util/storage'
// 注册Vuex
Vue.use(Vuex)
const USER_KEY = 'USER_KEY'
const IS_EXAM = 'IS_EXAM'
// 导出Vuex配置
export default new Vuex.Store({
  state:{
    // 保存后端返回的token值
    token: getItem(USER_KEY)|| '',
    // 是否是考试状态
    isExam: JSON.parse(window.sessionStorage.getItem(IS_EXAM)) || false,
    // 用户信息
    userInfo: null,
    // 考试题目
    subject:{},
    // 是否有消息
    hasMsg:false,
    // 是不是核查答案状态
    isCheckAnswer:false 
  },
  // 修改state中的属性，只能同步任务
  mutations:{
    // 更新登录状态
    updateLogin(ctx,[type,token]){
      ctx.token = token
      if(type === 0){
        removeItem(USER_KEY)
        return false
      }
      setItem(USER_KEY,ctx.token)
    },
    // 更新考试状态 在考试 or 不在
    updateIsExam(ctx,bool){
      console.log('进入了')
      ctx.isExam = bool
      window.sessionStorage.setItem(IS_EXAM, JSON.stringify(ctx.isExam))
    },
    fillSubject(ctx,obj){
      ctx.subject = obj
    },
    // 登录后设置用户信息
    setUserInfo(ctx,data){
      ctx.userInfo = data
    },
    // 设置hasMsg
    setHasMsg(ctx,bool){
      ctx.hasMsg = bool
    },
    setCheckAnswer(ctx, bool){
      ctx.isCheckAnswer = bool
    }
  },
  // 修改间接state中的属性，调用mutations中的方法可以使用异步任务
  actions:{
  },
  // 计算属性
  getters:{
    isLogin(ctx){
      return ctx.token?true:false
    }
  },
  // 模块划分
  modules:{
  }
})