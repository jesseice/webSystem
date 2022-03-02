import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem, removeItem } from '@/util/storage'

Vue.use(Vuex)

const USER_KEY = 'USER_KEY'
const IS_EXAM = 'IS_EXAM'

export default new Vuex.Store({
  state:{
    token: getItem(USER_KEY)|| '',
    isExam: JSON.parse(window.sessionStorage.getItem(IS_EXAM))|| false
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
    updateIsExam(ctx){
      ctx.isExam = !ctx.isExam
      window.sessionStorage.setItem(IS_EXAM, JSON.stringify(ctx.isExam))
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