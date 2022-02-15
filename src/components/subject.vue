<template>
  <div class="c-subject">
    <div class="c-subject__item" v-for="(item,ind) in subject" :key="ind">
      <div class="c-subject__item-title"><span>{{ind}}、</span>
        下列哪个样式定义后,内联(非块状)元素可以定义宽度和高度&nbsp;&nbsp;&nbsp;({{sbjType}})
      </div>
      <div class="c-subject__item-select">
        <radio-select :items="item"></radio-select>
      </div>
    </div>
  </div>
</template>

<script>
import RadioSelect from '@/components/radioSelect.vue'
export default {
  components:{
    RadioSelect
  },
  data() {
    return {
      radio1:"1",
      subject:{
        '1':['display:inline','display:none','display:block','display:inherit'],
        '2':['display:inline','display:none','display:block','display:inherit'],
        '3':['display:inline','display:none','display:block','display:inherit'],
        '4':['display:inline','display:none','display:block','display:inherit'],
      },
      sbjType:'单选题'
    };
  },
}
</script>

<style lang="scss" scoped>
.c-subject{
  .c-subject__item{
    .c-subject__item-title{
      min-width: 475px;
      max-width: 800px;
    }
    .c-subject__item-select{
      min-width: 475px;
      max-width: 800px;
      height: 300px;
    }
  }
}
</style>