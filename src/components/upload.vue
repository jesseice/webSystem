<template>
  <div class="c-upload">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      :action="action"
      :headers="headerObj"
      :on-success="handleAvatarSuccess"
      list-type="picture-card"
      :before-upload="beforeAvatarUpload"
      :limit="1"
      :auto-upload="false">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
    <el-link
      class="bt"
      type="primary"
      icon="el-icon-upload"
      @click="save">保存</el-link>
       &nbsp;&nbsp;
    <el-link
      type="primary"
      icon="el-icon-circle-close"
      @click="cansel">取消</el-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action:`${process.env.VUE_APP_API_URL}user/upload/avatar`,
      imageUrl: '',
      headerObj: {
        Authorization: `Bearer ${this.$store.state.token}`, 
      }
    }
  },
  methods: {
    save() {
      this.$refs.upload.submit();
    },
    cansel(){
      this.$emit('changeAva')
    },
    handleAvatarSuccess(res, file) {
      this.$message.success('上传头像成功！')
      console.log(res)
      console.log(file)
      // 上级
      this.$emit('changeAva')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      // false 不上传， true反之
      return isJPG && isLt2M;
    }
  }
}
</script>

<style lang="scss" scoped>
.c-upload{
  position: relative;
  .bt{
    margin: 0 auto;
  }
}
</style>