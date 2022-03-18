<template>
  <div class="c-subject" id="ddd">
    <div :style="{color:'#67C23A',fontSize:'30px',textAlign:'center',margin:'20px 0 30px 0'}">前端测评随机试题考试</div>
    <div class="c-subject__item" v-for="(item,ind) in subject" :key="ind">
      <span :id="`title${ind}`"></span>
      <div class="c-subject__item-title"><span>{{ind+1}}、</span>
        {{item.subject_title}}&nbsp;&nbsp;&nbsp;
        ({{(item.subject_type===0&&'单选题')||(item.subject_type===1&&'判断题')||(item.subject_type===2&&'多选题')}})
      </div>
      <div class="c-subject__item-select" :style="{height:item.subject_select.length>3?'300px':'150px'}">
        <radio-select
          @setRes=setResult
          @setSide=setSideNum
          :ix="ind"
          :subject_id="item.subject_id"
          :subject_type="item.subject_type"
          :items="item.subject_select"
          v-if="item.subject_type ===0||item.subject_type===1"
        ></radio-select>
        <multiple-select
          @setRes=setResult
          @setSide=setSideNum
          :ix="ind"
          :subject_id="item.subject_id"
          :subject_type="item.subject_type"
          :items="item.subject_select"
          v-else-if="item.subject_type ===2"
        ></multiple-select>
      </div>
    </div>
  </div>
</template>

<script>
import RadioSelect from '@/components/radioSelect.vue'
import MultipleSelect from '@/components/multipleSelect.vue'
import api from '@/api/index'
import eventBus from '@/util/eventbus.js'
export default {
  components:{
    RadioSelect,
    MultipleSelect
  },
  props:{
    subject:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      num:[], // 不同题目类的题目数量
      // subject:[],
      // sub:{
      //   subject_id: '',
      //   subject_select: '',
      //   subject_title: '',
      //   subject_type: ''
      // },
      subResult0:{}, // 'id':result
      subResult1:{},
      subResult2:{},
      // subResult:{
      //   subject_id:[],
      //   subject_result:[]
      // },
      sideObj:{}
    };
  },
  created(){
    this.$nextTick(()=>{
      this.subject.forEach((val,ind)=>{
        this.sideObj[ind] = false
      })
      eventBus.$emit('setSideObj',this.sideObj)
    })
    eventBus.$on('commit',this.commit)
  },
  methods:{
    setResult(id,result,type){
      this[`subResult${type}`][id] = result
      
    },
    async commit(){
      let subRes = {
        '0':this.subResult0,
        '1':this.subResult1,
        '2':this.subResult2,
      }
      const res = await api.commitResult(subRes)
      console.log(res);
    },
    setSideNum(ind,bool){
      if (this.sideObj[ind] === bool) { return false}
      this.$set(this.sideObj,ind,bool)
      // 改变题卡 卡片选中状态
      eventBus.$emit('setSideObj',this.sideObj)
    }
  }
}
</script>

<style lang="scss" scoped>
div::-webkit-scrollbar {
  width: 0;
}
.c-subject{
  background-color: #fff;
  min-width: 475px;
  max-width: 800px;
  padding: 20px 50px;
  .c-subject__item{
    .c-subject__item-title{
      margin: 0 auto;
      min-width: 475px;
      max-width: 800px;
      color: #409EFF;
    }
    .c-subject__item-select{
      margin: 0 auto;
      min-width: 475px;
      max-width: 800px;
    }
  }
}
</style>