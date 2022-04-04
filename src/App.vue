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