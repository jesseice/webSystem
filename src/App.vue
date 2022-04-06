<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed:{
    userInfo(){
      return this.$store.state.userInfo
    }
  },
  created(){
    // 监听是否有消息
    this.$socket.on('is has msg',bool=>{
      this.$store.commit('setHasMsg',bool)
    })
  },
  watch:{
    userInfo:{
      immediate:true,
      handler:function (newVal){
        if(newVal){
          this.$socket.emit('set sockets',newVal.user_name)
        }
      }
    }
  }
}
</script>

<style lang="scss">

</style>