<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed:{
    isLogin(){
      return this.$store.state.token?true:false
    }
  }
  ,
  watch:{
    isLogin:{
      immediate:true,
      deep:true,
      handler(newVal){
        if(newVal){
          let user_name = JSON.parse(window.sessionStorage.getItem('USER_INFO')).user_name
          this.$socket.emit('set sockets',user_name)
        }
      }
    }
  }
}
</script>

<style lang="scss">

</style>