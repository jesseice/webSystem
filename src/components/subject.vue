<template>
  <div class="c-subject" id="ddd">
    <div :style="{color:'#67C23A',textAlign:'center',margin:'20px 0 30px 0'}">前端测评随机试题考试</div>
    <div class="c-subject__item" v-for="(item,ind) in subject" :key="ind">
      <div class="c-subject__item-title"><span>{{ind+1}}、</span>
        {{item.subject_title}}&nbsp;&nbsp;&nbsp;
        ({{(item.subject_type===0&&'单选题')||(item.subject_type===1&&'判断题')||(item.subject_type===2&&'多选题')}})
      </div>
      <div class="c-subject__item-select" :style="{height:item.subject_select.length>3?'300px':'150px'}">
        <radio-select
          @setRes=setResult
          :subject_id="item.subject_id"
          :subject_type="item.subject_type"
          :items="item.subject_select"
          v-if="item.subject_type ===0||item.subject_type===1"
        ></radio-select>
        <multiple-select
          @setRes=setResult
          :subject_id="item.subject_id"
          :subject_type="item.subject_type"
          :items="item.subject_select"
          v-else-if="item.subject_type ===2"
        ></multiple-select>
      </div>
    </div>
      <el-button type="primary" @click="commit" round>提交試卷</el-button>
  </div>
</template>

<script>
import RadioSelect from '@/components/radioSelect.vue'
import MultipleSelect from '@/components/multipleSelect.vue'
import api from '@/api/index'
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
  // beforeRouteEnter(to,from,next){
  //   next(vm=>{
  //     vm.num = to.params.data
  //   })
  // },
  // beforeRouteLeave(to,from,next){
  //   this.$confirm('确定退出考试?', '确认信息', {
  //     confirmButtonText: '确认',
  //     cancelButtonText: '误触了',
  //     type: 'warning',
  //     center: true
  //   }).then(() => {
  //     this.$message.success('已退出考试状态!')
  //     this.$store.commit('updateIsExam')
  //     next()
  //   }).catch(() => {
  //   })
  // },
  // async mounted(){
  //   // this.fullScreen('ddd')
  //   // 禁止复制
  //   this.$nextTick(() => {
  //     document.oncontextmenu = new Function("event.returnValue=false"); // 禁用右键
  //     document.onselectstart = new Function("event.returnValue=false");  // 禁用选择
  //   })
  //   let res = await api.getSubject(this.num)
  //   if(res.code === 200){
  //     res.data.forEach(val=>{
  //       val.subject_select = val.subject_select.split('&&')
  //       this.subject.push(val)
  //     })
  //   }else{
  //     console.log('获取出错');
  //   }
  // },
  // beforeDestroy(){
  //   this.$nextTick(() => {
  //     document.oncontextmenu = new Function("event.returnValue=true"); // 启用右键
  //     document.onselectstart = new Function("event.returnValue=true");  // 启用选择
  //   })
  // },
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
      subResult0:{},
      subResult1:{},
      subResult2:{},
      // subResult:{
      //   subject_id:[],
      //   subject_result:[]
      // },
    };
  },
  methods:{
    // 全屏
    // fullScreen(id) {
    //   let element = document.getElementById(id)
    //   if (element.requestFullScreen)
    //     return element.requestFullScreen()
    //   if (element.webkitRequestFullScreen)
    //     return element.webkitRequestFullScreen()
    //   if (element.mozRequestFullScreen)
    //     return element.mozRequestFullScreen()
    //   if (element.msRequestFullScreen)
    //     return element.msRequestFullScreen()
    //   if (element.oRequestFullScreen)
    //     return element.oRequestFullScreen()
    // },
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
    }
  }
}
</script>

<style lang="scss" scoped>
div::-webkit-scrollbar {
  width: 0;
}
.c-subject{
  overflow: scroll;
  background-color: #fff;
  min-width: 475px;
  max-width: 800px;
  margin: 0 auto;
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