<template>
  <div class="c-tag">
    <el-tag type="success"
      v-for="item in list"
      :key="item.tag_id"
      :effect="tagIDs.indexOf(item.tag_id)<0?'plain':'dark'"
      @click="click(item.tag_id)"
    >{{item.tag_name}}</el-tag>
  </div>
</template>

<script>
export default {
  props:{
    list:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
    return {
      tagIDs: [],
    };
  },
  methods:{
    click(tag_id){
      const index = this.tagIDs.findIndex( val=> val === tag_id)
      if(index<0){
        this.tagIDs.push(tag_id)
      }else{
        this.tagIDs.splice(index,1)
      }
      this.$emit('setTags', this.tagIDs);
    },
    reSet(){
      this.tagIDs = this.$options.data().tagIDs
    }
  }
}
</script>

<style lang="scss" scoped>
  .c-tag{
    width: 500px;
    display: flex;
    column-gap: 33px;
    row-gap:10px ;
    align-items: center;
    flex-wrap: wrap;
    .el-tag--plain.el-tag--success,.el-tag--dark.el-tag--success{
      width: 100px;
      text-align: center;
    }
    .el-tag:hover{
      cursor: pointer;
    }
  }
</style>