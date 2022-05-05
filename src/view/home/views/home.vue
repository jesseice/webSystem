<template>
  <div class="p-home">
    <div class="p-home__calendar">
      <el-calendar v-model="value">
      </el-calendar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
.p-home{
  width: 100%;
  height: 100%;
  .p-home__calendar{
  }
}
</style>