import Vue from 'vue'
import Vuex from 'vuex'
import { getItem } from '@/util/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    token: getItem('USER_KEY')|| ''
  },
  mutations:{
    // 更新登录状态
    updateLogin(ctx){
      ctx.token = getItem('USER_KEY') || ''
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