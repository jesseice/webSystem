import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem, removeItem } from '@/util/storage'

Vue.use(Vuex)

const USER_KEY = 'USER_KEY'
const IS_EXAM = 'IS_EXAM'

export default new Vuex.Store({
  state:{
    token: getItem(USER_KEY)|| '',
    isExam: JSON.parse(window.sessionStorage.getItem(IS_EXAM))|| false,
    userInfo: null,
    subject:{},
    hasMsg:false
  },
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
    updateIsExam(ctx,bool){
      console.log('进入了')
      ctx.isExam = bool
      window.sessionStorage.setItem(IS_EXAM, JSON.stringify(ctx.isExam))
    },
    fillSubject(ctx,obj){
      ctx.subject = obj
    },
    setUserInfo(ctx,data){
      ctx.userInfo = data
    },
    setHasMsg(ctx,bool){
      ctx.hasMsg = bool
    }
  },
  actions:{
    
  },
  getters:{
    isLogin(ctx){
      return ctx.token?true:false
    }
  },
  modules:{

  }
})