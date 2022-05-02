<template>
  <div class="c-mark">
    <el-dialog
     :visible.sync="dialogTableVisible"
     :show-close="false"
     :close-on-click-modal="false">
      <div class="c-mark-title"></div>
      <div class="c-mark-ct">
        <div class="c-mark-ct__p">
          <el-progress type="circle" :color="customColors" :percentage="percentage"></el-progress>
          <div class="c-mark-ct__p__text">正确率</div>
          <div class="c-mark-ct__p__text c-mark-ct__txt">
            <div style="color:#5cb87a">正确题数:{{ res.zq }}</div>
            <div style="color:#f56c6c">错误题数:{{ res.count - res.zq }}</div>
          </div>
        </div>
      </div>
      <div class="c-mark-bt">
        <el-button plain @click="checkAnswer">核对答案</el-button>
        <el-button plain @click="back">自信离开</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import eventBus from '@/util/eventbus.js'
export default {
  data() {
    return {
      customColors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
      ],
      percentage:0,
      dialogTableVisible:false,
      res:{}
    };
  },
  created(){
    eventBus.$on('isShow',this.isShow)
  },
  methods:{
    isShow(res){
      this.res = res
      this.dialogTableVisible = true
      this.percentage = Math.floor((res.zq/res.count)*100)
    },
    checkAnswer(){
      this.$store.commit('setCheckAnswer',true)
      this.dialogTableVisible = false
    },
    back(){
      this.$router.replace('/home')
    }
  }
}
</script>

<style lang="scss">
.c-mark{
  .el-dialog{
    width: 438px;
    height: 502px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    color: #012ef5;
  }
  .el-dialog__body{
    flex-grow: 1;
    background-color: #FFF;
    color: #303133;
    transition: .3s;
    display: flex;
    flex-direction: column;
  }
  
  .c-mark-title{
    flex-grow: .15;
  }
  .c-mark-ct{
    flex-grow: .75;
    display: flex;
    justify-content: center;
    .c-mark-ct__p{
      text-align: center;
      .c-mark-ct__p__text{
        margin-top: 20px;
        width: 200px;
      }
      .c-mark-ct__txt{
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .c-mark-bt{
    flex-grow:.1;
    display: flex;
    justify-content: space-between;
  }
}
</style>