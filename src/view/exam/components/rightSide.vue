<template>
  <div class="c-r-side">
    <div
      class="c-r-side__content"
      :style="{top:60+topH+'px'}"
    >
      <div style="text-align:center">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
      <el-divider></el-divider>
      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名">{{ userName }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { getItem } from "@/util/storage"
export default {
  data() {
    return {
      topH: 0,
      timer:null,
      userName:'Not found'
    };
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll)
    this.userName = getItem('USER_NAME')
  },
  methods:{
    handleScroll(){
      this.topH = document.documentElement.scrollTop || document.body.scrollTop
    }
  },
  beforeDestroy(){
    window.removeEventListener('scroll',this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.c-r-side{
  flex-grow: .5;
  position: relative;
  .c-r-side__content{
    width: 285px;
    min-height: 300px;
    padding: 20px 15px;
    box-sizing: border-box;
    background-color: #fff;
    position: absolute;
    left: 20px;
  }
}
</style>