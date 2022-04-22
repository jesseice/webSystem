<template>
  <div :class="{'c-fri':true,'current':index === curIndex}" @click="click">
    <div :class="{'c-fri-left':true, 'my__badge--news':hasMsg}">
      <img :src="friInfo.friend_avatar" width="43px" height="43px" alt="">
    </div>
    <div class="c-fri-middle">
      <div class="c-fri-middle__name">{{friInfo.friend_name}}</div>
      <div class="c-fri-middle__news">{{lastMsg}}</div>
    </div>
    <div class="c-fri-right">
      <div class="c-fri-right__time">{{friInfo.time}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    friMsg:{
      type:Array,
      default:()=>[]
    },
    friInfo:{
      type:Object,
      default:()=>{}
    },
    index:{
      type:Number,
      default:0
    },
    curIndex:{
      type:Number,
      default:0
    },
    whoSendMsgs:{
      type:Array,
      default:()=>[]
    }
  },
  computed:{
    hasMsg(){
      return this.whoSendMsgs.findIndex(val=>val === this.friInfo.user_name)>=0?true:false
    },
    lastMsg(){
      if( !this.friMsg.length){return '暂无消息'}
      let len = this.friMsg.length
      let last = this.friMsg[len-1]
      return last[1]
    }
  },
  methods:{
    click(){
      // console.log(this.friInfo);
      this.$emit('atFriend',this.friInfo,this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-fri{
  // width: 237px;
  width: 100%;
  height: 65px;
  box-sizing: border-box;
  padding: 10px;
  // border: 1px red solid;
  background-color: #a9a6a621;
  font-size: 15px;
  display: flex;
  justify-content: space-between;


  .c-fri-left{
    box-sizing: border-box;
    position: relative;
  }

  .c-fri-middle{
    display: flex;
    width: 123px;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 5px;
    .c-fri-middle__name,.c-fri-middle__news{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; /* 指定显示文本的行数 */
      // overflow-y: auto; /* 超出隐藏 */
      overflow: hidden; /* 超出隐藏 */
      text-overflow: ellipsis; /* 超出部分显示省略号 */
      box-sizing: border-box;
    }
    .c-fri-middle__name{
      width: 100%;
    }
    .c-fri-middle__news{
      color: rgb(148, 147, 147);
    }
  }
  
  .c-fri-right{
    width: 38px;
    .c-fri-right__time{
      text-align: right;
      color: rgb(148, 147, 147);
    }
  }
}
.c-fri:hover{
  background: #4e4d4d21;
}
.current{
  background: #4e4d4d21;
}
</style>