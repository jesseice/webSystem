<template>
  <div class="p-draw">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="题目类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择题目类型">
          <el-option label="单选题" value="0"></el-option>
          <el-option label="判断题" value="1"></el-option>
          <el-option label="多选题" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目介绍" prop="title">
        <el-input type="textarea" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item
        :prop="`select[${index}].value`"
        :rules="rules.value"
        v-show="form.type"
        :label="`选项${index+1}`"
        v-for="(item,index) in form.select"
        :key="index"
      >
        <el-input v-model="item.value" size="medium" placeholder="选项内容"></el-input>
        
        <el-button
          type="danger"
          icon="el-icon-delete-solid"
          @click.prevent="removeDomain(index)"
          v-if="form.select.length !== 1 && form.type !== '1'"
          circle
        >
        </el-button>
        <el-button
          class="p-draw__addbt"
          type="primary"
          icon="el-icon-plus"
          circle
          v-if="index === form.select.length-1  && form.type !== '1'"
          @click="addSelect"
        >
        </el-button>
      </el-form-item>
      <el-form-item v-if="form.type" label="选项答案" :prop="form.type==='2'?'resList':'res'">
        <!-- 单选 -->
        <el-radio-group v-if="form.type==='0'||form.type==='1'" v-model="form.res">
          <el-radio :label="index" v-for="(item,index) in form.select" :key="index">{{'选项'+(index+1)}}</el-radio>
        </el-radio-group>
        
        <!-- 多选 -->
        <el-checkbox-group v-if="form.type==='2'" v-model="form.resList">
          <el-checkbox :label="index" v-for="(item,index) in form.select" :key="index">{{'选项'+(index+1)}}</el-checkbox>
        </el-checkbox-group>

      </el-form-item>
      <el-form-item label="题目共享" prop="is_private">
        <el-radio v-model="form.is_private" label=0>共享给所有用户</el-radio>
        <el-radio v-model="form.is_private" label=1>只有自己能用</el-radio>
      </el-form-item>
      <el-form-item label="题目标签">
        <tag
          :list="tagList"
          @setTags=setTag
          ref="tag"
          ></tag>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="reSet">取消</el-button>
        <el-button @click="isPreview = !isPreview">{{isPreview?'关闭预览':'打开预览'}}</el-button>
      </el-form-item>
    </el-form>
    <transition name="el-zoom-in-center">
      <div :style="{'margin-top':topH+'px'}" class="p-draw__preview" v-show="isPreview">
        <h5 class="text__center">预览</h5>
        <div class="p-draw__preview__title">{{form.title}}
          &nbsp;&nbsp;&nbsp;
          ({{(form.type==='0'&&'单选题')||(form.type==='1'&&'判断题')||(form.type==='2'&&'多选题')}})</div>
        <div class="p-draw__preview__selects" v-if="form.select.length !==1&&form.select[0].value !== ''">
          <div
            class="p-draw__preview__select"
            v-for="(item,ind) in form.select"
            :key="ind">
            <p class="p-draw__preview__select__p">{{item.value}}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '@/api'
import Tag from '@/components/tag'
export default {
  components:{
    Tag
  },
  computed:{
    type(){
      return this.form.type
    }
  },
  watch:{
    type:{
      handler: function(newVal){
        if(newVal === '1'){
          this.form.select = [{value:''}, {value:''}]
        }
      }
    }
  },
  data() {
    return {
      isPreview:false,
      topH:0,
      tagList:[],
      form: {
        title: '',
        select: [
          {
            value:''
          },
        ],
        type: '',
        resList:[],
        res:'',
        is_private:undefined,// 0公开 1 私有
        tags:[]
      },
      rules:{
        title:[
          { required: true, message: '请输入题目标题', trigger: 'blur' },
        ],
        is_private:[
          { required: true, message: '请选择题目是否公开', trigger: 'blur' },
        ],
        type:[
          { required: true, message: '请选择题目类型', trigger: 'change' }
        ],
        value:[
            { required: true, message: '请填写选项答案', trigger: 'blur' }
        ],
        resList:[
            { required: true, message: '输入正确的答案选项', trigger: 'blur' }
        ],
        res:[
            { required: true, message: '输入正确的答案选项', trigger: 'blur' }
        ],
      }
    }
  },
  async created(){
    const resTag = await api.getTag()
    this.tagList = resTag.data
    console.log(resTag)
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate(valid=>{
        if(valid){
          this.draw() // 提交
        }else{
          this.$message.error('提交失败!请检查输入格式!')
        }
      })
    },
    reSet(){
      this.$nextTick(()=>{
        this.$refs['form'].resetFields()
        this.form.select = [{
          value:''
        }]
        this.$refs['tag'].reSet()
      })
    },
    async draw(){
      const _form = this.form
      let subject_result
      let subject_select = []
      if(_form.type === '2'){
        subject_result = _form.resList.join("&&")
      }else{
        subject_result = _form.res
      }
      
      for(let i=0;i<_form.select.length;i++){
        subject_select.push(_form.select[i].value)
      }
      subject_select = subject_select.join("&&")

      const form = {
        subject_result,
        subject_type:_form.type,
        subject_title:_form.title,
        subject_select,
        tags:_form.tags,
        is_private:_form.is_private
      }
      const res = await api.createQ(form)
      if(res.code === 200){
        // console.log(res)
        this.$message.success(res.msg)
        this.addCollect(res.data)
        this.reSet()
      }else{
        this.$message.error(res.msg)
      }
    },
    async addCollect(data){
      let sbj_id = data.sbj_id
      let sbj_title = data.sbj_title
      let sbj_type = data.sbj_type
      const res = await api.collectTopic({sbj_id, sbj_title, sbj_type, status:0})
      console.log('插入个人题库:',res)
    },
    addSelect(){
      const form = this.form
      const select = this.form.select
      const type = form.type
      if(type === '1'&&select.length>=2){
        return false
      }
      select.push({
        value:''
      })

      // this.subResult()
    },
    removeDomain(index){
      this.form.select.splice(index,1)
    },
    subResult(){
    },
    setTag(list){
      // this.curTag.push(id)
      this.form.tags = [...list]
    },
    handleScroll(){
      this.topH = document.documentElement.scrollTop || document.body.scrollTop
    }
  }
}
</script>

<style lang="scss">
.p-draw{
  display: flex;
  justify-content: space-between;
  .el-form-item__content{
    position: relative;
    .el-input__inner,.el-textarea__inner{
      width: 500px;
    }
  }
  
  .p-draw__preview{
    width: 600px;
    max-height: 500px;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 20px 10px;
    border: 1px #E4EdED solid;
    box-shadow: 2px #d4d4d4;
    .p-draw__preview__title{
      position: relative;
      margin: 10px auto;
      color: #409EFF;
    }
    .p-draw__preview__selects{
      width: 100%;
      min-height:250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 20px;
      .p-draw__preview__select{
        width: 100%;
        border-radius: 6px;
        border: 1px solid #d4d4d4;
        background: #fff;
        font-size: 14px;
        padding: 10px;
        box-sizing: border-box;
        .p-draw__preview__select__p{
          width: 100%;
          word-break: break-all;
          word-wrap: break-word;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>