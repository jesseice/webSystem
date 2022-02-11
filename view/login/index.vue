<template>
  <div class="p-login">
    <!-- 账号：<input type="text" v-model="acount" >
    密码：<input type="password" v-model="password" >
    电话：<input type="text" maxlength="11" v-model="phone"> -->
    <el-card class="box-card">
      <!-- 登录 -->
      <div class="p-login__wrap" v-if="registOrLogin===1">
        <el-form ref="form1" :model="form" label-width="120px">
          <el-form-item  prop="acount" :rules="[{ required: true, message: '用户名不能为空'}]">
            <el-input :clearable='true' placeholder="用户名" v-model="form.acount"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :clearable='true' placeholder="请输入密码" v-model="form.password" show-password></el-input>
            <!-- <el-input  v-model="input" show-password></el-input> -->
          </el-form-item>
          <el-button type="primary" size="medium" @click="login">登录</el-button>
        </el-form>
        <el-button type="text" @click="changeInput(1)">没有账号？现在去注册</el-button>
      </div>
      <!-- ----------- -->
      <!-- 注册 -->
      <div class="p-login__wrap" v-else>
        <el-form ref="form2" :model="form" label-width="120px">
          <el-form-item>
            <el-input :clearable='true' placeholder="用户名" v-model="form.acount"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :clearable='true' placeholder="设置密码" v-model="form.newPassword" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :clearable='true' placeholder="确认密码" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-input oninput = "value=value.replace(/[^\d]/g,'')" :clearable='true' placeholder="请输入手机号码" v-model="form.phone"></el-input>
          </el-form-item>
          <el-button type="primary" size="medium" @click="regist">注册</el-button>
        </el-form>
        <el-button type="text" @click="changeInput(0)">已有账号？现在去登录</el-button>
      </div>
      <!-- --------------- -->
    </el-card>
  </div>
</template>

<script>
import { registUser } from '@/api'
export default {

  data() {
    return {
      form:{
        acount: '',
        password:'',
        newPassword:'',
        phone:''
      },
      registOrLogin:1
    };
  },
  methods:{
    // 登录
    login(){
      this.$refs['form1'].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 注册逻辑，有接口请求
    async regist(){
      const form = this.form
      const res = await registUser({userName:form.acount,userPassword:form.password,userPhone:form.phone})
      if(res.data.errno){
        return console.log('注册失败');
      }
      console.log(res.data.msg)
    },

    // 切换登录和注册界面
    changeInput(index){
      if(index===0){
        this.registOrLogin = 1
      }else{
        this.registOrLogin = 0
      }
    }
  }
}
</script>

<style lang="scss">
.p-login{
  height:100vh;
  position: relative;
  .box-card{
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
    width: 690px;
    height: 537px;
    box-sizing: border-box;
    padding: 30px;
    .p-login__wrap{
      position: absolute;
      transform: translate(-50%,-50%);
      left: 50%;
      top: 50%;
      width: 400px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .el-form-item__content{
          margin-left: 0 !important;
        }
      }
      .el-button--text {
        position: absolute;
        bottom: 30px;
        right: 0;
      }
      .el-input--suffix,.el-input__inner,
      .el-button--primary{
        width: 340px
      }
    }
  }
}
</style>