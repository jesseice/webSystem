<template>
  <div class="c-note">
    <h3 style="text-align:center">好友请求</h3>
    <div class="c-note-box" v-for="(fri, index) in friends" :key="index">
      <img :src="fri.fri_avatar" alt="da" width="45px" height="45px">
      <div class="c-note-box__name">{{fri.fri_name}}</div>
      <div class="c-note-box__bts">
        <i class="el-icon-check" @click="resolve(index)"></i>
        <i class="el-icon-close" @click="reject(index)"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    friends:{
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      user_info:JSON.parse(window.sessionStorage.getItem('USER_INFO')) || {}
    }
  },
  methods:{
    resolve(index){
      // this.fri.splice(index,1)
      this.$socket.emit('chum request status', this.user_info.user_id, this.user_info.user_name, this.friends[index].fri_id, this.friends[index].fri_name, 1)
      this.$emit('clearReq', index)
    },
    reject(index){
      // this.fri.splice(index,1)
      this.$socket.emit('chum request status', this.user_info.user_id, this.user_info.user_name, this.friends[index].fri_id, this.friends[index].fri_name, 0)
      this.$emit('clearReq', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-note{
  .c-note-box{
    width: 100%;
    height: 65px;
    box-sizing: border-box;
    padding: 10px;
    background-color: #a9a6a621;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .c-note-box__name,.c-note-box__bts i{
    line-height: 45px;
  }
  .c-note-box__bts i{
    font-size: 20px;
    cursor: pointer;
  }
  .c-note-box__bts .el-icon-close{
    color:  rgb(201, 100, 100);
  }
  .c-note-box__bts .el-icon-close:hover{
    color:  rgb(226, 33, 33);
    transform: scale(1.1,1.1);
  }
  .c-note-box__bts .el-icon-check{
    color:  rgb(111, 172, 111);
  }
  .c-note-box__bts .el-icon-check:hover{
    color:  rgb(57, 201, 57);
    transform: scale(1.1,1.1);
  }
  .c-note-box__bts{
    width: 60px;
    display: flex;
    justify-content: space-between;
  }
}
</style>