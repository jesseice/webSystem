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
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">消息中心</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">账号设置</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-switch-button"></i>
          <span slot="title">退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
// import { removeItem } from '@/util/storage'
import eventBus from '@/util/eventbus'
export default {
  data() {
    return {
      drawer:false,
      direction: 'rtl',
    };
  },
  created(){
    eventBus.$on('ctrDrawer',()=>{
      this.drawer = !this.drawer
    })
  },
  methods:{
    handleSelect(index){
      console.log(index);
      switch(index){
        case '1':
          console.log(1);
        break;
        case '2':
          console.log(2);
        break;
        case '3':
          console.log(3);
        break;
        case '4':
          this.outLogin()
        break;
      }
    },
    outLogin(){
      this.$confirm('是否退出账号', '小提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('退出成功!')
        // removeItem('USER_KEY')
        this.$store.commit('updateLogin',[0,''])
        eventBus.$emit('ctrDrawer')
      }).catch(() => {
        console.log('取消退出');
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