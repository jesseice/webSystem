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
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        {{user_name}}
      </el-menu-item>
    </el-menu>
    <div class="p-layout__content">
      <router-view></router-view>
    </div>
    <personal-set></personal-set>
  </div>
</template>

<script>
import eventBus from '@/util/eventbus'
import PersonalSet from "@/components/personalSet.vue"
import { getItem } from "@/util/storage"
export default {
  components:{
    PersonalSet
  },
  data() {
    return {
      activeIndex:'1',
      currentIndex:'1',
      user_name:'小a程序猿'
    };
  },
  beforeRouteEnter(to, from, next){ 
    next(vm=>{
      vm.user_name = getItem('USER_NAME')
    })
  },
  created(){
    // 防止刷新丢失菜单选中项的状态
    this.activeIndex = JSON.parse(window.sessionStorage.getItem("currentIndex"))  || '1'
    console.log(this.isLogin)
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
        this.$message.info('未登录,1秒后自动跳转登录页面!')
        setTimeout(()=>{this.login(1)},1000)
        return false
      }
      this.$router.push({ path: '/draw' })
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