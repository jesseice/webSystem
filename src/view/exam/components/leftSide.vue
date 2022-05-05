<template>
  <div class="c-l-side">
    <div
      class="c-l-side__content"
      :style="{top:60+topH+'px'}"
    >
      <div style="text-align:center;margin-bottom:20px; color: #409EFF;">题卡</div>
      <el-divider></el-divider>
      <div class="c-l-side__qc">
        <div class="c-l-side__num" v-for="(item,ind) in obj" :key="item.subject_id">
          <a
            :class="{'c-l-side__num__a':true,
            'a_primary':!sideObj[ind]?false:true,
            'error_boder':isCheckAnswer && errorArr.findIndex(val=>val === item.subject_id) >=0,
            'hover':!isCheckAnswer}"
            href="javascript:;"
            @click="goAnchor(`#title${ind}`)"
            >
            {{ ind+1 }}
            <!-- <el-button :type="!sideObj[ind]? 'plain':'primary'" size="small">{{ ind+1 }}</el-button> -->
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
    },
    isError:{
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      topH: 0,
      timer:null,
      sideObj:{},
      errorArr:null
    };
  },
  created(){
    eventBus.$on('setSideObj',this.setSideObj)
    eventBus.$on('resolveError',this.resolveError)
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll)
  },
  computed:{
    isShow(){
      return this.$store.state.isExam
    },
    isCheckAnswer(){
      return this.$store.state.isCheckAnswer
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
        this.$router.replace('/home')
      }).catch((err) => {
        console.log(err)
      })
    },
    out(){
      this.$store.commit('setCheckAnswer',false)
      this.$router.replace('/home')
    },
    resolveError(data){
      let res = data
      let newArr = []
      for(let k in res ){
        res[k].forEach(val => newArr.push(val))
      }
      this.errorArr = [...newArr]
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
    padding: 20px 15px 60px;
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
      .c-l-side__num{
        width: 39px;
        height: 32px;
        .c-l-side__num__a{
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
          text-align: center;
          background: #FFF;
          border: 1px solid #DCDFE6;
          color: #606266;
          line-height: 32px;
          font-size: 12px;
        }
        .hover:hover{
          color: #409EFF;
          background: #ecf5ff;
          border-color: #b3d8ff;
        }
        .a_primary{
          color: #FFF;
          background-color: #409EFF;
          border-color: #409EFF;
        }
        .error_boder{
          border:2px rgb(209, 82, 82) solid;
        }
      }
    }
    .c-l-side__bt__wrap{
      position: absolute;
      width: 255px;
      bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>