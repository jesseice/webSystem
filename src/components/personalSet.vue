<template>
  <div class="c-personal">
    <el-drawer

      :size="250"
      :modal="false"
      :show-close="false"
      title="个人中心"
      :visible.sync="drawer"
      :direction="direction">
      <el-menu
        default-active="2"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#fff"
        >
        <el-menu-item index="1">
          <i class="el-icon-setting"></i>
          <span slot="title">账号设置</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-chat-dot-round"></i>
          <span :class="{'my__badge':hasMsg}" slot="title">消息中心</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-switch-button"></i>
          <span slot="title">退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
import eventBus from '@/util/eventbus'
export default {
  computed:{
    hasMsg(){
      return this.$store.state.hasMsg
    }
  },
  data() {
    return {
      drawer:false,
      direction: 'rtl',
      current: undefined
    };
  },
  created(){
    eventBus.$on('ctrDrawer',()=>{
      this.drawer = !this.drawer
    })
  },
  methods:{
    handleSelect(index){
      switch(index){
        case '1':
          this.goSet();
        break;
        case '2':
          this.goNews()
        break;
        case '3':
          this.outLogin()
        break;
      }
    },
    goSet(){
      let str = window.location.hash
      if(/\/set/.test(str)){
        return this.$message.info('已在该页面')
      }
      this.$router.push('/set')
    },
    goNews(){
      this.$router.push('/news')
    },
    outLogin(){
      this.$confirm('是否退出账号', '小提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let a = JSON.parse(window.sessionStorage.getItem('USER_INFO'))
        this.$socket.emit('out login',a.user_name)
        this.$message.success('退出成功!')
        this.$store.commit('updateLogin',[0,''])
        eventBus.$emit('ctrDrawer')
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss">
.c-personal{
  .el-drawer{
    background-color: #545c64;
    .el-drawer__header{
      margin-bottom: 0;
      padding: 0;
      height: 60px;
      text-align: center;
      color: #fff;
    }
  }
  
}
</style>