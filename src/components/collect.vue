<template>
  <div class="c-collect" @click="col">
    <i v-if="status === 0" class="el-icon-star-off"></i>
    <i v-else class="el-icon-star-on"></i>
  </div>
</template>

<script>
import api from '@/api'
export default {
  props:{
    sbj_id:{
      type:String,
      default: '0'
    },
    sbj_type:{
      type:Number,
      default: 0
    },
    sbj_title:{
      type:String,
      default:'未填写'
    }
  },
  async created(){
    const res = await api.hasCollection({sbj_id:this.sbj_id,sbj_type:this.sbj_type})
    if(res.code === 200){
      this.status = res.status
    }
  },
  data() {
    return {
      status: 0,// 0没有收藏  1  收藏
      timer:null
    };
  },
  methods:{
    async collect(){
      const res = await api.collectTopic( {sbj_id: this.sbj_id, sbj_type: this.sbj_type, sbj_title:this.sbj_title, status: this.status} )
      if(res.code === 200){
        this.$message.success(res.msg)
      }else{
        this.$message.error(res.msg)
      }
      this.status = res.status
    },
    col(){
      if(this.timer){
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(this.collect,200)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-collect{
  position: absolute;
  top: 0;
  right: 0;
}

</style>