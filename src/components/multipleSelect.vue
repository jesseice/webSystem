<template>
<!-- wyd-单选、判断选项组件 -->
  <div class="c-multiple-select">
    <div
      :class="{'c-multiple-select__wrap':true,
      'hover':!isCheckAnswer,
      'active':currentIndex[index]===true}"
      @click="select(index)" v-for="(item,index) in items" 
      :key="index">
      <p class="c-multiple-select__select">{{item}}</p>
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
  created(){
    this.items.forEach((val,index)=>{
      this.currentIndex[index] = false
    })
  },
  data() {
    return {
      currentIndex:{},
      subject_result:[]
    };
  },
  methods:{
    select(index){
      if(this.isCheckAnswer){return}
      this.currentIndex[index] = !this.currentIndex[index]
      this.subject_result = []
      for(let k in this.currentIndex){
        if(this.currentIndex[k]===true){
          this.subject_result.push(k)
        }
      }
      const str = this.subject_result.join('&&')
      this.$emit('setRes',this.subject_id,str,this.subject_type)
      this.$emit('setSide',this.ix,str!==''?true:false)
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
  .c-multiple-select{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .c-multiple-select__wrap{
      width: 100%;
      overflow: hidden;
      border-radius: 6px;
      border: 1px solid #d4d4d4;
      background: #fff;
      font-size: 14px;
      padding: 10px;
      box-sizing: border-box;
      .c-multiple-select__select{
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