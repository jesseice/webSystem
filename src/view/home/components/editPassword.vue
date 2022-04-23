<template>
  <div>
    <el-form :model="Form" :rules="rules" ref="Form" label-width="100px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input type="password" show-password v-model="Form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" show-password v-model="Form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="againPassword">
        <el-input type="password" v-model="Form.againPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.Form.againPassword !== '') {
          this.$refs.Form.validateField('againPassword');
        }
        callback();
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.Form.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      Form: {
        oldPassword:'',
        newPassword:'',
        againPassword:'',
      },
      rules:{
        oldPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur' },
        ],
        newPassword: [
          { validator: validatePass, trigger: 'blur' },
          { pattern:/^[\d\w]{6,}/ ,message:'用户名必须为6个(英文,数字)任意组合以上',trigger:'blur'}
        ],
        againPassword: [
          { validator: validatePass2, trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    async onSubmit(){
      const res = await api.setPassword(this.Form)
      if(res.code === 200){
        this.$message.success(res.msg+'两秒后自动跳转登录页！')
        let a = JSON.parse(window.sessionStorage.getItem('USER_INFO'))
        this.$socket.emit('out login',a.user_name)
        this.$store.commit('updateLogin',[0,''])
        setTimeout(()=>{this.$router.push('/login')},2000)
      }else{
        this.$message.error(res.msg)
      }
    }
  }
}
</script>

<style>

</style>