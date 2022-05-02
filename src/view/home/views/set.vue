<template>
  <div class="p-set">
    <div class="p-set__breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="p-set__info">
      <el-descriptions
        class="margin-top"
        title="个人资料"
        direction="vertical"
        border
        :column="2">

        <el-descriptions-item >
          <template slot="label">
            头像
          </template>
          <img v-if="!avatarEdit" :src="userInfo.user_avatar" alt="" width="60px" height="60px">
          <div v-else>
            <Upload
              @changeAva="changeAvatarEditStatus"
            ></Upload>
          </div>
          <el-link type="primary" v-if="!avatarEdit" icon="el-icon-edit" @click="changeAvatarEditStatus">更换头像</el-link>
        </el-descriptions-item>
        <el-descriptions-item v-for="item in userInfoWrap" :key="item.type">
          <template slot="label">
            <i :class="item.icon"></i>
            {{item.type}}
          </template>
          <div v-if="item.canEdit && item.isEdit">
            <el-input v-if="item.prop !== 'user_sex'" v-model="userInfo[item.prop]" placeholder="请输入内容"></el-input>
            <el-select v-else v-model="userInfo.user_sex" placeholder="请选择">
              <el-option
                v-for="item in ['男','女','不知性别']"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-link
              type="primary"
              icon="el-icon-upload"
              @click="save(item)">保存</el-link>
              &nbsp;&nbsp;
            <el-link
              type="primary"
              icon="el-icon-circle-close"
              @click="cansel(item)">取消</el-link>
          </div>
          <span v-else>{{userInfo[item.prop] || '-'}}</span>
          <el-link
            type="primary"
            v-if="item.canEdit && !item.isEdit"
            icon="el-icon-edit"
            @click="edit(item)"
            >编辑</el-link>
        </el-descriptions-item>

        <el-descriptions-item >
          <template slot="label">
            密码
          </template>
          *****************
          <el-link type="primary" icon="el-icon-edit" @click="dialogTableVisible = !dialogTableVisible">修改密码</el-link>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <el-dialog title="Edit user password" :visible.sync="dialogTableVisible">
      <edit-password></edit-password>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
import EditPassword from '../components/editPassword'
import Upload from '@/components/upload'
export default {
  components:{
    EditPassword,
    Upload
  },
  async created(){
    const res = await api.getUserInfo()
    if(res.code === 200){
      let user = res.data[0]
      let userinfo = user
      this.userInfo = userinfo
      this.initInfo = {...userinfo}
    }
  },
  data() {
    return {
      userInfoWrap: [
        {
          icon:"el-icon-user",
          type:'用户id',
          prop:'user_id',
          canEdit:false,
          isEdit:false
        },
        {
          icon:"el-icon-user",
          type:'用户名',
          prop:'user_name',
          canEdit:false,
          isEdit:false
        },
        {
          icon:"el-icon-user",
          type:'性别',
          prop:'user_sex',
          canEdit:true,
          isEdit:false
        },
        {
          icon:"el-icon-mobile-phone",
          type:'手机号',
          prop:'user_phone',
          canEdit:true,
          isEdit:false
        },
        {
          icon:"el-icon-mobile-phone",
          type:'创建时间',
          prop:'user_createtime',
          canEdit:false, // 是否可以编辑
          isEdit:false // 是不是编辑状态
        },
      ],
      userInfo:{
        user_name:'',
        user_id:'',
        user_avatar:'',
        user_createtime:'',
        user_sex:'',
        user_phone:''
      },
      initInfo:null,
      dialogTableVisible:false,
      avatarEdit:false
    }
  },
  methods:{
    // item为userInfoWrap中的对象
    edit(item){
      item.isEdit = true
    },
    async save(item){
      const dat = {}
      dat.name = item.prop
      dat.value = this.userInfo[item.prop]
      if(item.prop === 'user_phone'){
        if(!/^1[34578]\d{9}$/.test(dat.value)){
          this.$message.error('请输入正确的手机号')
          return false
        }
      }
      if(!dat.value === this.initInfo[item.prop]){
        const res = await api.setInfo(dat)
        if(res.code === 200){
          item.isEdit = false
          this.$message.success(res.msg)
        }else{
          this.reSet(item)
          this.$message.error(res.msg)
        }
      }
    },
    cansel(item){
      this.reSet(item)
      item.isEdit = false
    },
    reSet(item){
       this.userInfo[item.prop] = this.initInfo[item.prop]
    },
    changeAvatarEditStatus(){
      this.avatarEdit = !this.avatarEdit
    }
  }
}
</script>

<style lang="scss" scoped>
.p-set{
  .p-set__breadcrumb{
    margin: 0 0 40px;
  }
}
</style>