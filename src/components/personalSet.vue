<template>
  <div>
<el-drawer
  :size="250"
  :modal="false"
  :show-close="false"
  title="我是标题"
  :visible.sync="drawer"
  :direction="direction">
  <span>我来啦!</span>
</el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer:true,
      direction: 'ltr',
    };
  },
}
</script>

<style lang="scss" scoped>

</style>