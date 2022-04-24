<template>
  <div class="xbk">
    <h1 style="text-align:center">小冰块界面</h1>
    <h4 style="text-align:center;margin-top:40px">节约里程排序</h4>
    <div class="xbk-pig">
      <img src="@/assets/img/节约.jpg" width="400px" height="300px" alt="">
    </div>
    <div style="width:500px;margin:40px auto" >
      <el-form ref="form" :model="form" label-width="80px" :rules="rule">
        <el-form-item label="字母数" prop="zimushu">
          <el-input type="number" placeholder="输入A至最大字母的个数" v-model="form.zimushu"></el-input>
        </el-form-item>
        <el-form-item label="数据导入" prop="data">
          <el-input type="textarea" placeholder="输入数据,每个数据用(中英逗号or空格or回车)隔开,如左图顺序写入" v-model="form.data"></el-input>
        </el-form-item>
         <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建节约里程排序表</el-button>
          <el-button @click="cansle">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin:0 auto" v-if="show" >
      <!-- <span v-for="(item, k, ind) in dat" :key="ind">
        <span>{{ind+1}}、</span>{{k}}:{{dat[k]}}
        <br>
      </span> -->
      <table border="1">
        <tr>
          <th>序号</th>
          <th>线路</th>
          <th>节约里程</th>
        </tr>
        <tbody>
          <tr v-for="(item, k, ind) in dat" :key="ind">
            <td>{{ind+1}}</td>
            <td>{{k}}</td>
            <td>{{dat[k]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:{
        zimushu:undefined,
        data:'',
      },
      rule:{
        zimushu:{ required: true, message: '请输入个数', trigger: 'blur' },
        data:{ required: true, message: '请输入内容', trigger: 'blur' },
      },
      show:false,
      dat:null
    };
  },
  methods:{
    onSubmit(){
      this.$refs['form'].validate(async(valid) => {
        if(valid){
          let nums = this.form.data
          nums = nums.trim()
          let newNums = []
          let a = nums.split(/[\s|\uff0c|\n|,]+/)
          if(a.length !== this.form.zimushu*(this.form.zimushu - 1)/2){
            return this.$message.error('输入的数据数量不对')
          }
          console.log(a)
          a.forEach((val, index)=>{
            newNums[index] = val*1
          })
          console.log(newNums)
          let len = this.form.zimushu*1
          let arr1 = []
          let arr2
          for(let i = 0; i<len; i++){
            arr1.push(String.fromCharCode(65+i))
          }
          arr2 = [...arr1]
          arr2.splice(-1, 1)
          let Obj = new Object()
          arr2.forEach((val, index) =>{
            for(let i = index+1; i<arr1.length; i++){
              Obj[val + arr1[i]] = 0
            }
          })
          Object.keys(Obj).forEach((val, index) => {
            Obj[val] = newNums[index]
          })
          let res = this.mSort(Obj,newNums)
          this.dat = res
          this.show = true
          console.log(res)
        }else{
          return false
        }
      })
    },
    mSort(obj,nums){
      let newObj = {}
      for(let i=0;i<nums.length;i++){
        let max = undefined
        let tempk
        for(let k in obj){
          if(!max){
            max = obj[k]
            tempk = k
          }
          if(max < obj[k]){
            max = obj[k]
            tempk = k
          }
        }
        newObj[tempk] = max
        delete obj[tempk]
      }
      return newObj
    },
    // 4.8,8.5,15.6,13.0,4.3,0.8,18.5,13.5,2.3,0,0,0,10.3,15.6,0.6,2.0,9.9,6.0,6.0,10.0,0.0,4.5,4.5,7.5,8.0,4.9,16.2,20.5,4.6,0,0,2,3.5,1.5,2,2.5,0,3.1,4.4,0,9,8.5,0.5,7.5,10.5,10.5,5,11.8,16.8,19,19,22,40.5,22.5,7,8.5,16,27,21,22.5,2,5,5,13.1,12.2,19.2,14,1,6,4.5,0,0,2.2,2.6,0,5.5,24,15,20.5,6.5,3.5,9,17,7.5,5,7.5,11,10,2,5,6.4,6.5,11.3,7.5,19.5,4.9,1.7,0,14.5,4.1,4,22,0.1,18.8,25.5
   cansle(){
      this.$nextTick(()=>{
        this.$refs['form'].resetFields()
        this.dat = null
        this.show = false
      })
    }
  }
}
</script>

<style lang="scss" scope>
.xbk{
  table{
    margin: 0 auto;
    border-collapse:collapse;
    border-spacing:10px 50px;
  }
  .xbk-wrap{
  }
  .xbk-pig{
    position: absolute;
    left: 100px;
    top: 100px;
  }
}
</style>