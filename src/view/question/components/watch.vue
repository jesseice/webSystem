<template>
  <div class="c-watch">
    <div class="c-watch__title">{{subject && subject.subject_title || ''}}
      &nbsp;&nbsp;&nbsp;
      ({{subject && subject.subject_type || ''}})
    </div>
    <div v-if="subject">
      <div
        class="c-watch__select"
        v-for="(item,ind) in subject.subject_select"
        :key="ind">
        <p class="c-watch__select__p"><span>选项{{ind + 1}}:&nbsp;&nbsp;&nbsp;</span>{{item}}</p>
      </div>
      <div>
        正确答案:<span v-for="(val, ind) in subject.subject_result" :key="ind">选项{{val*1+1}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    subject:{
      type: Object,
      default: ()=>{}
    }
  }
}
</script>

<style lang='scss' scoped>
.c-watch{
  .c-watch__title{
    color: #409EFF;
  }
  .c-watch__select{
    .c-watch__select__p{
      padding: 10px 5px;
      border: 1px #d4d4d4 solid;
      margin: 10px 0;
    }
  }
}
</style>