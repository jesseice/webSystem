<template>
  <div class="p-login">
    <!-- 账号：<input type="text" v-model="acount" >
    密码：<input type="password" v-model="password" >
    电话：<input type="text" maxlength="11" v-model="phone"> -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
      <el-input v-model="acount"></el-input>
      </el-form-item>
    </el-form>
    <!-- <button @click="regist">注册</button> -->
    <el-button type="primary" @click="regist">注册</el-button>
  </div>
</template>

<script>
import { registUser } from '@/api'
export default {

  data() {
    return {
      acount: '',
      password:'',
      phone:''
    };
  },
  methods:{
    // 注册逻辑，有接口请求
    async regist(){
      const res = await registUser({userName:this.acount,userPassword:this.password,userPhone:this.phone})
      if(res.data.errno){
        return console.log('注册失败');
      }
      console.log(res.data.msg)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>