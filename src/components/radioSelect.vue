<template>
<!-- wyd-单选、判断选项组件 -->
  <div class="c-radio-select">
    <div :class="{'c-radio-select__wrap':true,'hover':!isCheckAnswer,'active':currentIndex===index}" @click="select(index)" v-for="(item,index) in items" :key="index">
      <p class="c-radio-select__select">{{item}}</p>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * items 为单选题或者判断题的 选项内容对象（当前这道题的全部选项对象集合）
   */
  props:{
    ix:{
      type:Number,
      default:0
    },
    items:{
      type:Array,
      default:()=>[]
    },
    subject_id:{
      type:String,
      default:''
    },
    subject_type:{
      type:Number,
      default:0
    },
    isCheckAnswer:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex:undefined,
    };
  },
  methods:{
    select(index){
      if(this.isCheckAnswer){return}
      this.currentIndex = index
      this.$emit('setRes',this.subject_id,`${index}`,this.subject_type)
      this.$emit('setSide',this.ix,true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .c-radio-select{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .c-radio-select__wrap{
      width: 100%;
      overflow: hidden;
      border-radius: 6px;
      border: 1px solid #d4d4d4;
      background: #fff;
      font-size: 14px;
      padding: 10px;
      box-sizing: border-box;
      .c-radio-select__select{
        margin: 0;
        width: 100%;
        word-break: break-all;
        word-wrap: break-word;
        box-sizing: border-box;
      }
    }
    .hover:hover{
      background-color: #d4d4d4;
      cursor: pointer;
      border-color: #409EFF;
    }
    .active{
      border:2px solid #409EFF;
    }
  }
</style>