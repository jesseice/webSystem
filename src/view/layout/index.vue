<template>
  <div class="p-layout">
    <div style="height:61px; width:100% position:relative"></div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#409EFF"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" >首页</el-menu-item>
      <el-menu-item index="2">模拟考试</el-menu-item>
      <el-menu-item index="3">创建题目</el-menu-item>
      <el-menu-item index="4">个人题库</el-menu-item>
      <el-menu-item class="p-layout__login" @click="login(1)" v-if="!isLogin">登录 | 注册</el-menu-item>
      <el-menu-item class="p-layout__login" @click="login(2)" v-else>
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
      activeIndex:'1',
      currentIndex:'1',
      user:{}
    };
  },
  async created(){
    // 防止刷新丢失菜单选中项的状态
    this.activeIndex = JSON.parse(window.sessionStorage.getItem("currentIndex"))  || '1'

    const user =await api.getUserInfo()
    this.user = user.data[0]
    window.sessionStorage.setItem(USER_INFO,JSON.stringify(this.user))
    // this.handleSelect(this.activeIndex)
  },
  computed:{
    isLogin(){
      return this.$store.getters.isLogin
    }
  },
  methods:{
    handleSelect(index){
      if(index === this.currentIndex){return false}
      switch (index){
        case '1': 
          this.home()
        break;
        case '2':
          this.exam()
        break;
        case '3':
          this.draw()
        break;
        case '4':
          this.question()
        break;
      }
      this.currentIndex = index
      
      window.sessionStorage.setItem("currentIndex",JSON.stringify(index))
    },
    // 首页
    home(){
      this.$router.push({ path: '/' })
      // console.log('首页');
    },
    // 模拟考试
    exam(){
      this.$router.push({ path: '/exam' })
      // console.log('模拟考试');
    },
    // 创建题目
    draw(){
      if(!this.isLogin){
         this.$confirm('未登录,是否立即跳转登录页?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '稍后',
          type: 'warning',
          center: true
        }).then(() => {
          this.login(1)
        }).catch(() => {
           this.$router.push({ path: '/draw' })
        });
      }else{
        this.$router.push({ path: '/draw' })
      }
      // console.log('创建题目');
    },
    // 个人题库
    question(){
      this.$router.push({ path: '/question' })
      // console.log('个人题库');
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
    z-index: 2001;
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