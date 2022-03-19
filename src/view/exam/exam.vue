<template>
  <div class="p-exams">
    <l-side 
      :obj="subject"
    ></l-side>
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
    LSide,
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{
        vm.num = to.params.data
    })
  },
  async mounted(){
    // 禁止复制
    this.$nextTick(() => {
      document.oncontextmenu = new Function("event.returnValue=false"); // 禁用右键
      document.onselectstart = new Function("event.returnValue=false");  // 禁用选择
    })
    // 禁止浏览器后退
    history.pushState(null, null, document.URL);

    window.addEventListener("popstate",this.noBack, false)

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
      num: null
    }
  },
  methods:{
    noBack(){
      history.pushState(null, null, document.URL);
    }
  },
  beforeDestroy(){
    this.$nextTick(() => {
      document.oncontextmenu = new Function("event.returnValue=true"); // 启用右键
      document.onselectstart = new Function("event.returnValue=true");  // 启用选择
    })
    window.removeEventListener('popstate', this.noBack, false)
  }
}
</script>

<style lang="scss" scoped>
.p-exams{
  // position: relative;
  display: flex;
  width: 100%;
  background-color: #F2F6FC;
}
</style>