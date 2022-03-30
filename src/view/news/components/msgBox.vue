<template>
  <div class="c-msg__box">
    <!-- 好友 -->
      <div v-if="point === 'left'" class="c-msg__box--left">
        <div class="c-msg__box--avatar">
          <img :src="friAvatar" width="100%" height="100%" alt="">
        </div>
        <section class="left">
          {{ content }}
        </section>
      </div>

      <!-- 我的 -->
      <div v-else class="c-msg__box--right">
        <div class="c-msg__box--avatar">
          <img :src="my_avatar" width="100%" height="100%" alt="">
        </div>
        <section class="right">
          {{ content }}
        </section>
      </div>
  </div>
</template>

<script>
export default {
  /**
   *@param point 消息的指向left为好友，right为自己
   *@param content 为一条消息的内容
   *@param friAvatar 为好友头像
   *@param my_avatar 自己头像
   */
  props:{
    point:{
      type:String,
      default:'left'
    },
    content:{
      type:String,
      default:'content'
    },
    friAvatar:{
      type:String,
      default:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  data() {
    return {
      my_avatar:JSON.parse(window.sessionStorage.getItem('USER_INFO')).user_avatar||''
    };
  },
}
</script>

<style lang='scss' scoped>
.c-msg__box{
  .c-msg__box--left{
    display: flex;
    box-sizing: border-box;
    padding: 15px 0;
    section::after{
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      left: -11px;
      top: 11px;
      border: 6px solid transparent;
      border-right-color: #fcefe8;
    }
  }
  .c-msg__box--right{
    display: flex;
    flex-direction: row-reverse;
    box-sizing: border-box;
    padding: 15px 0;
    section::after{
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      right: -11px;
      top: 11px;
      border: 6px solid transparent;
      border-left-color: #fcefe8;;
    }
  }
  .c-msg__box--avatar{
    width: 40px;
    height: 40px;
  }
  section{
    position: relative;
    max-width: 300px;
    line-height: 2em;
    box-sizing: border-box;
    padding: 5px;
    font-size: 15px;
    background: #fcefe8;;
    border-radius: 6px;
    word-break: break-all;
  }
  .right{
    margin-right: 20px;
  }
  .left{
    margin-left: 20px;
  }
}
</style>