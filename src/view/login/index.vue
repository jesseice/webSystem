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
          <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
            <el-input :clearable='true' placeholder="请输入密码" v-model="form.password" show-password></el-input>
            <!-- <el-input  v-model="input" show-password></el-input> -->
          </el-form-item>
          <el-button type="primary" size="medium" @keyup.enter="login" @click="login" :loading="loading">{{!loading?'登录':'登陆中...'}}</el-button>
        </el-form>
        <el-button type="text" @click="changeInput(1)">没有账号?现在去注册</el-button>
      </div>
      <!-- ----------- -->
      <!-- 注册 -->
      <div class="p-login__wrap" v-else>
        <el-form ref="form2" :model="form" label-width="120px">
          <el-form-item prop="acount" :rules="[{ required: true, message: '用户名不能为空'}]">
            <el-input :clearable='true' placeholder="用户名" v-model="form.acount"></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
            <el-input :clearable='true' placeholder="设置密码" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :clearable='true' type="password" placeholder="确认密码" v-model="form.newPassword"></el-input>
          </el-form-item>
          <el-form-item prop="phone" :rules="[{ required: true, message: '手机号不能为空'}]">
            <el-input oninput = "value=value.replace(/[^\d]/g,'')" :clearable='true' placeholder="请输入手机号码" v-model="form.phone"></el-input>
          </el-form-item>
          <el-button type="primary" size="medium" @click="regist" :loading="loading" >{{!loading?'注册':'注册中...'}}</el-button>
        </el-form>
        <el-button type="text" @click="changeInput(0)">已有账号?现在去登录</el-button>
      </div>
      <!-- --------------- -->
    </el-card>
  </div>
</template>

<script>
import api from '@/api/index'
import crypto from '@/util/crypto'
import { setItem } from '@/util/storage'
export default {

  data() {
    return {
      form:{
        acount: '',
        password:'',
        newPassword:'',
        phone:''
      },
      registOrLogin:1,
      loading:false
    };
  },
  mounted(){
    window.addEventListener('keydown',this.keydown);
  },
  destroyed(){
    window.removeEventListener('keydown',this.keydown,false);
  },
  methods:{
    // 登录 form1表
    login(){
      this.$refs['form1'].validate(async(valid) => {
        if (valid) {
          this.loading = true

          const aa = crypto.Encrypt(this.form.password)
         
          const res = await api.login({userName:this.form.acount,userPassword:aa})

          console.log(res.token)

          if(res.code === "200"){
            this.$message.success(res.msg)
            setItem("USER_KEY",res.token)
            setItem("USER_NAME",this.form.acount)
            // 设置登录属性 
            this.$store.commit('updateLogin')
            this.$router.push({path:'/'})
          }else{
            this.loading = false
            this.$message.error(res.msg)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 注册逻辑，有接口请求from2表
    async regist(){
      let flag = false
      this.$refs['form2'].validate((valid) => {
        if (valid) {
          flag = true
        } else {
          flag = false
          console.log('请重新输入')
          return false
        }
      });
      if(!flag){return false}
      const form = this.form
      if(form.newPassword!==form.password){return this.$message.error('两次密码不一样')}
      this.loading = true
      form.password = crypto.Encrypt(form.password)
      // 连接接口
      const res = await api.registUser({userName:form.acount,userPassword:form.password,userPhone:form.phone})
      console.log('--------');
      console.log(res);
      console.log('--------');
      if(res.errno){
        this.loading = false
        return this.$message.error('注册失败,该账号名已被注册!')
      }
      this.loading = false
      this.$message.success(res.msg)
      this.form = this.$options.data().form
      this.registOrLogin = 1
    },

    // 切换登录和注册界面
    changeInput(index){
      this.resetForm(index)
      if(index===0){
        this.registOrLogin = 1
      }else{
        this.registOrLogin = 0
      }
    },

    // 重置表单
    resetForm(index){
      let str = ''
      if(index ===1){
        str = 'form1'
      }else{
        str = 'form2'
      }
      this.$nextTick(()=>{
        this.$refs[str].resetFields()
      })
    },

    keydown(e){
      if(e.keyCode===13){
        this.login()
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