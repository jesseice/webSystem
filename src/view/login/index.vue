<template>
  <div class="p-login">
    <el-card class="box-card">
      <div class="box-card__title">前端测评系统</div>
      <!-- 登录 -->
      <div class="p-login__wrap" v-show="registOrLogin===1">
        <el-form ref="form1" :model="form1" label-width="120px">
          <el-form-item  prop="acount" :rules="[{ required: true, message: '用户名不能为空'}]">
            <el-input :clearable='true' placeholder="用户名" v-model="form1.acount"></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
            <el-input :clearable='true' placeholder="请输入密码" v-model="form1.password" show-password></el-input>
          </el-form-item>
          <el-button type="primary" size="medium" @keyup.enter="login" @click="login" :loading="loading">{{!loading?'登录':'登陆中...'}}</el-button>
        </el-form>
        <el-button type="text" @click="changeInput(1)">没有账号?现在去注册</el-button>
      </div>
      <!-- ----------- -->
      <!-- 注册 -->
      <div class="p-login__wrap" v-show="registOrLogin===0">
        <el-form ref="form2" :rules="rules2" :model="form2" label-width="120px">
          <el-form-item prop="acount">
            <el-input :clearable='true' placeholder="用户名" v-model="form2.acount"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :clearable='true' placeholder="设置密码" v-model="form2.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-input :clearable='true' type="password" placeholder="确认密码" v-model="form2.newPassword"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input oninput = "value=value.replace(/[^\d]/g,'')" maxlength="11" :clearable='true' placeholder="请输入手机号码" v-model="form2.phone"></el-input>
          </el-form-item>
          <el-button type="primary" size="medium" @click="regist" :loading="loading" >{{!loading?'注册':'注册中...'}}</el-button>
        </el-form>
        <el-button type="text" @click="changeInput(0)">已有账号?现在去登录</el-button>
      </div>
      <!-- --------------- -->
    </el-card>
    <vue-particles
      color="#00cc00"
      linesColor="0c5da5"
      :moveSpeed="4"
      hoverMode="grab"
      ></vue-particles>
  </div>
</template>

<script>
import api from '@/api/index'
import crypto from '@/util/crypto'
import { setItem } from '@/util/storage'
export default {

  data() {
    return {
      form1:{
        acount: '',
        password:'',
      },
      form2:{
        acount: '',
        password:'',
        newPassword:'',
        phone:''
      },
      registOrLogin:1,
      loading:false,
      rules2:{
        acount:[
          { required: true, message: '用户名不能为空',trigger:'blur'},
          { pattern:/^[\d\w]{6,}/ ,message:'用户名必须为6个英文与数字以上的组合',trigger:'blur'}
        ],
        phone:[
          {required:true,message:'请填写号码',trigger:'blur'},
          {pattern:/^1[34578]\d{9}$/,message:'请输入正确格式的手机号码'}
        ],
        password:[{ required: true, message: '密码不能为空',trigger:'blur'}]
      }
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

          const aa = crypto.Encrypt(this.form1.password)
         
          const res = await api.login({userName:this.form1.acount,userPassword:aa})

          console.log(res.token)

          if(res.code === "200"){
            this.$message.success(res.msg)
            setItem("USER_NAME",this.form1.acount)
            // 设置登录属性 
            this.$store.commit('updateLogin',[1,res.token])
            this.$router.go(-1)
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
      const form = this.form2
      if(form.newPassword!==form.password){return this.$message.error('两次密码不一样')}
      this.loading = true
      const aa = crypto.Encrypt(form.password)
      // 连接接口
      const res = await api.registUser({userName:form.acount,userPassword:aa,userPhone:form.phone})
      console.log('--------');
      console.log(res);
      console.log('--------');
      if(res.code === 400){
        this.loading = false
        return this.$message.error('注册失败,该账号名已被注册!')
      }
      this.loading = false
      this.$message.success(res.msg)
      this.form2 = this.$options.data().form2
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
      let str = ``
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
  // background: linear-gradient(-180deg, #dcf2e6 0%, #ffffff 100%);
  background-image: url('~@/assets/img/login_bg.png');
  background-position: center 0;
  background-size: cover;
  background-repeat: no-repeat;
  height:100vh;
  overflow: hidden;
  position: relative;
  .box-card{
    background: linear-gradient(-180deg, #56cae7 0%, #dbe2e2 100%);
    // background-image: url('~@/assets/img/login_bg.png');
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
    width: 690px;
    height: 537px;
    box-sizing: border-box;
    padding: 30px;
    .box-card__title{
      position: absolute;
      transform: translate(-50%,0);
      left: 50%;
      top: 30px;
      font-size: 50px;
      color: white;
      font-family: cursive;
    }
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