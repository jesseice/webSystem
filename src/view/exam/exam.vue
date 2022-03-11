<template>
  <div class="p-exams">
    <l-side></l-side>
    <subject
      :subject="subject"
    ></subject>
    <r-side></r-side>
  </div>
</template>

<script>
import Subject from '@/components/subject'
import LSide from '@/view/exam/components/leftSide'
import RSide from '@/view/exam/components/rightSide'
import api from '@/api/index'
export default {
  components:{
    Subject,
    RSide,
    LSide
  },
  beforeRouteLeave(to,from,next){
    // this.$confirm('确定退出考试?', '确认信息', {
    //   confirmButtonText: '确认',
    //   cancelButtonText: '误触了',
    //   type: 'warning',
    //   center: true
    // }).then(() => {
    //   this.$message.success('已退出考试状态!')
    //   this.$store.commit('updateIsExam')
    //   next()
    // }).catch(() => {
    // })
    this.$store.commit('updateIsExam')
    next()
  },
  async mounted(){
    // 禁止复制
    this.$nextTick(() => {
      document.oncontextmenu = new Function("event.returnValue=false"); // 禁用右键
      document.onselectstart = new Function("event.returnValue=false");  // 禁用选择
    })
    let res = await api.getSubject(this.num)
    if(res.code === 200){
      res.data.forEach(val=>{
        val.subject_select = val.subject_select.split('&&')
        this.subject.push(val)
      })
    }else{
      console.log('获取出错');
    }
  },
  data() {
    return {
      subject: [],
    }
  },
  methods:{

  },
  beforeDestroy(){
    this.$nextTick(() => {
      document.oncontextmenu = new Function("event.returnValue=true"); // 启用右键
      document.onselectstart = new Function("event.returnValue=true");  // 启用选择
    })
  }
}
</script>

<style lang="scss" scoped>
.p-exams{
  position: relative;
  width: 100%;
  background-color: #F2F6FC;
}
</style>