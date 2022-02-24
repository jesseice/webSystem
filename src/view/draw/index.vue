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
      <el-form-item v-show="form.type" :label="`选项${index+1}`" v-for="(item,index) in form.select" :key="item.key">
        <el-input v-model="item.value" size="medium" placeholder="选项内容"></el-input>
        <el-button
          type="danger"
          icon="el-icon-delete-solid"
          @click.prevent="removeDomain(index)"
          v-if="form.select.length!==1"
          circle
        >
        </el-button>
        <el-button
          class="p-draw__addbt"
          type="primary"
          icon="el-icon-plus"
          circle
          v-if="index === form.select.length-1"
          @click="addSelect"
        >
        </el-button>
      </el-form-item>
      <el-form-item v-if="form.type" label="选项答案">
        <!-- 单选 -->
        <el-radio-group v-if="form.type==='0'||form.type==='1'" v-model="form.res">
          <el-radio :label="index" v-for="(item,index) in form.select" :key="index">{{form.type==='0'?index+1:Boolean(index)}}</el-radio>
        </el-radio-group>
        
        <!-- 多选 -->
        <el-checkbox-group v-if="form.type==='2'" v-model="form.resList">
          <el-checkbox :label="index" v-for="(item,index) in form.select" :key="index">{{index+1}}</el-checkbox>
        </el-checkbox-group>


      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
          title: '',
          select: [
            {
              key:'A',
              value:''
            },
          ],
          type: '',
          resList:[],
          res:''
        },
        rules:{
          title:[
            { required: true, message: '请输入题目标题', trigger: 'blur' },
          ],
          type:[
            { required: true, message: '请选择题目类型', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      addSelect(){
        const form = this.form
        const select = this.form.select
        const type = form.type
        if(type === '1'&&select.length>=2){
          return false
        }
        select.push({ 
          key:`${String.fromCharCode(65+select.length)}`,
          value:''
        })

        this.subResult()
      },
      removeDomain(index){
        this.form.select.splice(index,1)
      },
      // selChange(index){
      //   // console.log(index);
      //   if(index ==='1'){
      //     this.form.select.length = 2
      //   }
      // },
      subResult(){
        // const startNum = 65
        // const endNum = 90
        // String.fromCharCode(num);
        // this.form.select.forEach((val,index)=>{
        //   this.form.checkList.push(String.fromCharCode(startNum+index))
        // })
        
      }
    }
}
</script>

<style lang="scss">
.p-draw{
  .el-form-item__content{
    position: relative;
    .el-input__inner,.el-textarea__inner{
      width: 500px;
    }
    .p-draw__addbt{
      // margin: 0 auto;
      // position: absolute;
      // transform: translate(-50%,-50%);
      // top: 50%;
      // right: 0;
    }
  }
  
}
</style>