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
    }
  }
}
</script>

<style lang="scss" scoped>
  .c-tag{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
</style>