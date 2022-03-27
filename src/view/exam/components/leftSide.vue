<template>
  <div class="c-l-side">
    <div
      class="c-l-side__content"
      :style="{top:60+topH+'px'}"
    >
      <div style="text-align:center;margin-bottom:20px; color: #409EFF;">题卡</div>
      <el-divider></el-divider>
      <div class="c-l-side__qc">
        <div class="c-l-side__num"
          v-for="(item,ind) in obj" :key="ind"
        >
          <a href="javascript:;" @click="goAnchor(`#title${ind}`)">
            <el-button :type="!sideObj[ind]? 'plain':'primary'" size="small">{{ ind+1 }}</el-button>
          </a>
        </div>
      </div>
      <!-- <el-divider></el-divider> -->
      <div class="c-l-side__bt__wrap" v-if="isShow">
        <el-button type="primary" @click="commit" round>提交試卷</el-button>
        <el-button type="primary" @click="examOut" round>退出考试</el-button>
      </div>
      <div class="c-l-side__bt__wrap" v-else>
        <el-button type="primary" @click="out" round>关闭试卷</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '@/util/eventbus.js'
export default {
  props:{
    obj:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      topH: 0,
      timer:null,
      sideObj:{}
    };
  },
  created(){
    eventBus.$on('setSideObj',this.setSideObj)
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll)
  },
  computed:{
    isShow(){
      return this.$store.state.isExam
    }
  },
  methods:{
    handleScroll(){
      this.topH = document.documentElement.scrollTop || document.body.scrollTop
    },
    goAnchor(id){
      document.querySelector(id).scrollIntoView({
        behavior:"smooth"
      })
    },
    setSideObj(obj){
      this.sideObj = obj
    },
    commit(){
      this.$confirm('提交试卷?', '确认信息', {
        confirmButtonText: '提交',
        cancelButtonText: '继续考试',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message.success('提交成功!')
        eventBus.$emit('commit')
      }).catch((err) => {
        console.log(err)
      })
    },
    examOut(){
      this.$confirm('退出考试,一切作答无效,确定退出考试?', '确认信息', {
        confirmButtonText: '退出考试',
        cancelButtonText: '继续考试',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message.success('已退出考试!')
        this.$store.commit('updateIsExam',false)
        this.$router.replace('/')
      }).catch((err) => {
        console.log(err)
      })
    },
    out(){
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.c-l-side{
  flex-grow: .5;
  position: relative;
  .c-l-side__content{
    width: 285px;
    min-height: 300px;
    padding: 20px 15px;
    box-sizing: border-box;
    background-color: #fff;
    position: absolute;
    right: 20px;
    .c-l-side__qc{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      column-gap: 15px;
      row-gap: 10px;
      // justify-content: space-between;
    }
    .c-l-side__bt__wrap{
      position: absolute;
      width: 255px;
      bottom: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>