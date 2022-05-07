<template>
  <div class="c-subject" id="ddd">
    <div :style="{color:'#67C23A',fontSize:'30px',textAlign:'center',margin:'20px 0 30px 0'}">前端测评随机试题考试</div>
    <div class="c-subject__item" v-for="(item,ind) in subject" :key="ind">
      <span :id="`title${ind}`"></span>
      <div class="c-subject__item-title"><span>{{ind+1}}、</span>
        {{item.subject_title}}&nbsp;&nbsp;&nbsp;
        ({{(item.subject_type===0&&'单选题')||(item.subject_type===1&&'判断题')||(item.subject_type===2&&'多选题')}})
        <p v-if="isCheckAnswer">(答案：
          <span
            v-for="(a,b) in sbjAnswer&&sbjAnswer[item.subject_type][item.subject_id].split('&&')"
            :key="b"
            style="color: rgb(111, 172, 111)">
            选项{{a*1+1}}
          </span>)
        </p>
        <collect-topic
          :sbj_id="item.subject_id"
          :sbj_type="item.subject_type"
          :sbj_title="item.subject_title"
        ></collect-topic>
      </div>
      <div class="c-subject__item-select" :style="{height:item.subject_select.length>3?'300px':'150px'}">
        <radio-select
          @setRes=setResult
          @setSide=setSideNum
          :ix="ind"
          :subject_id="item.subject_id"
          :subject_type="item.subject_type"
          :items="item.subject_select"
          :isCheckAnswer ="isCheckAnswer"
          v-if="item.subject_type ===0||item.subject_type===1"
        ></radio-select>
        <multiple-select
          @setRes=setResult
          @setSide=setSideNum
          :ix="ind"
          :subject_id="item.subject_id"
          :subject_type="item.subject_type"
          :items="item.subject_select"
          :isCheckAnswer ="isCheckAnswer"
          v-else-if="item.subject_type ===2"
        ></multiple-select>
      </div>
    </div>
  </div>
</template>

<script>
import RadioSelect from '@/components/radioSelect.vue'
import MultipleSelect from '@/components/multipleSelect.vue'
import CollectTopic from '@/components/collect'
import api from '@/api/index'
import eventBus from '@/util/eventbus.js'
export default {
  components:{
    RadioSelect,
    MultipleSelect,
    CollectTopic
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
      sideObj:{},
      // 提交后返回的试题答案
      sbjAnswer:null
    };
  },
  computed:{
    isCheckAnswer(){
      return this.$store.state.isCheckAnswer
    }
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
  mounted(){
    //  props是通过ajax获取的动态值不能在created  mounted 
  },
  methods:{
    setResult(id,result,type){
      this[`subResult${type}`][id] = result
    },
    // 提交答案
    async commit(){
      console.log('提交')
      let subRes = {
        '0':this.subResult0,
        '1':this.subResult1,
        '2':this.subResult2,
      }
      const res = await api.commitResult(subRes)
      if(res.code === 200){
        this.$message.success(res.msg)
        this.sbjAnswer = res.data.apiObj
        // 传过去mark组件
        eventBus.$emit('isShow',res.data)
        // 传过去题卡
        eventBus.$emit('resolveError',res.data.errId)
        this.$store.commit('updateIsExam',false)
      }
    },
    setSideNum(ind,bool){
      if (this.sideObj[ind] === bool){ return false}
      this.$set(this.sideObj,ind,bool)
      // 改变题卡 卡片选中状态
      eventBus.$emit('setSideObj',this.sideObj)
    },
    // 答案初始化
    resultInit(subject){
      subject.forEach(val=>{
        // this[`subjectResult${val.subject_type}`][val.subject_id] = ''
        switch(val.subject_type){
          case 0:this.subResult0[val.subject_id] = ''
            break;
          case 1:this.subResult1[val.subject_id] = ''
            break;
          case 2:this.subResult2[val.subject_id] = ''
            break;
        }
      })
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
      position: relative;
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