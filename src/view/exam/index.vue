<template>
  <div>
    <button @click="fn" v-if="isShow" > 点击获取考试试卷</button>
    <!-- <subject></subject> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Subject from '@/components/subject.vue'
export default {
  components:{
    // Subject
  },
  data() {
    return {
      isShow: true
    };
  },
  methods:{
    fn(){
      if(!this.$store.getters.isLogin){return this.$message.error('请登录')}
      this.$confirm('是否进入全屏考试状态', '小提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('进入考试状态!')
        this.isShow = false
        this.$store.commit('updateIsExam')
        this.$router.push({path:'exam/radexam'})
      }).catch(() => {
        console.log('取消退出');
      })
    }
  }
}
</script>

<style>

</style>