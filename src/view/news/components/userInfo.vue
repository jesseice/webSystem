<template>
  <div class="c-user__info">
    <img :src="user.user_avatar" alt="加载失败" width="43px" height="43px">
    <div class="c-user__info__name">{{user.user_name}}</div>
    <div class="c-user__info__add" style="line-height:45px,color:blue">
      <el-tooltip effect="dark" content="添加好友" placement="top">
      <i class="el-icon-circle-plus-outline" @click="addFri"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    user:{
      type:Object,
      default:()=>{}
    }
  },
  methods:{
    addFri(){
      console.log(1);
    }
  }
}
</script>

<style lang="scss" scoped>
.c-user__info{
  margin: 10px 0;
  width: 100%;
  height: 65px;
  box-sizing: border-box;
  padding: 10px;
  background: #a9a6a621;
  display: flex;
  justify-content: space-between;
  .c-user__info__name, .c-user__info__add{
    line-height:45px;
    font-size: 20px;
  }
  .c-user__info__add{
    font-size: 40px;
    color:rgb(39, 194, 65);
  }
  .c-user__info__add:hover{
    cursor: pointer;
  }
}
</style>