<template>
  <div class="p-layout">
    <div style="height:61px; width:100% position:relative"></div>
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      background-color="#409EFF"
      text-color="#fff"
      :router="true"
      active-text-color="#ffd04b">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/exam">模拟考试</el-menu-item>
      <el-menu-item index="/draw">创建题目</el-menu-item>
      <el-menu-item index="/question">个人题库</el-menu-item>
      <el-menu-item class="p-layout__login" @click="login(1)" v-if="!isLogin">登录 | 注册</el-menu-item>
      <el-menu-item :class="{'p-layout__login':true, 'my__badge':hasMsg}" @click="login(2)" v-else>
        <el-avatar :src="user.user_avatar"></el-avatar>
        {{user.user_name}}
      </el-menu-item>
    </el-menu>
    <div class="p-layout__content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <personal-set></personal-set>
  </div>
</template>

<script>
import eventBus from '@/util/eventbus'
import PersonalSet from "@/components/personalSet.vue"
// import { getItem } from "@/util/storage"
import api from '@/api'
const USER_INFO = 'USER_INFO'
export default {
  components:{
    PersonalSet
  },
  data() {
    return {
      // activeIndex:'1',
      // currentIndex:'1',
      user:{}
    };
  },
  created(){
    // 防止刷新丢失菜单选中项的状态
    // this.activeIndex = JSON.parse(window.sessionStorage.getItem("currentIndex"))  || '1'
    this.getInfo()
    eventBus.$on('laoutGetInfo', this.getInfo)
  },
  computed:{
    isLogin(){
      return this.$store.getters.isLogin
    },
    hasMsg(){
      return this.$store.state.hasMsg
    }
  },
  methods:{
    async getInfo(){
      const user =await api.getUserInfo()
      if(user.code !== 200){
        return false
      }
      this.user = user.data[0]
      window.sessionStorage.setItem(USER_INFO,JSON.stringify(this.user))
      // 保存给APP.vue用
      this.$store.commit('setUserInfo',this.user)
      // this.handleSelect(this.activeIndex)
      this.$socket.emit('is has msg',this.user.user_name)

      this.$socket.emit('is in chat page',this.user.user_name,false)
    },
    login(index){
      if(index ===1){
        this.$router.push({path:'/login'})
      }else if(index === 2){
        // 打开抽屉
        eventBus.$emit('ctrDrawer')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-layout{
  .el-menu{
    // 抽屉为2002
    z-index: 1999;
    position: fixed;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    min-width: 1045px;
    padding: 0 250px;
    .p-layout__login{
      position: absolute;
      right: 250px;
    }
  }
  .p-layout__content{
    padding: 20px 250px;
  }
}
</style>