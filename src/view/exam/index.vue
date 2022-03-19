<template>
  <div class="p-exam">
    <div v-if="isShow">
      <span>考试参数设置</span>
      <el-divider></el-divider>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item>
            <el-switch
              v-model="value"
              @change="changeSet"
              active-text="自定义设置"
              inactive-text="默认设置">
            </el-switch>
          </el-form-item>
          <el-form-item
            v-for="(item,index) in form.num"
            :key="index"
            :prop="`num[${index}].sub_num`">
            <div class="block">
              <span :class="{demonstration:true,blue:value,gray:disabled}" >{{item.name}}数量</span>
              <!-- 小记：v-model不支持迭代器的元素 如  v-model="item.sub_num" -->
              <el-slider
                v-model="form.num[index].sub_num"
                show-input
                :max="item.sub_max"
                :disabled="disabled"
              >
              </el-slider>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <button @click="fn"> 点击获取考试试卷</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import api from '@/api'
// import eventBus from '@/util/eventbus.js'
export default {
  components:{
    // Subject
  },
  data() {
    return {
      value:false,
      form:{
        num:[
          {
            name:'单选题',
            sub_num:25,
            sub_max:100
          },
          {
            name:'判断题',
            sub_num:10,
            sub_max:100
          },
          {
            name:'多选题',
            sub_num:5,
            sub_max:100
          },
        ]
      }
    };
  },  
  computed:{
    disabled(){
      return !this.value
    },
    isShow(){
      return !this.$store.state.isExam
    }
  },
  async created(){
    const res = await api.getSubNum()
    for(let k in res.data){
      this.form.num[k].sub_max = res.data[k]
    }
  },
  methods:{
    fn(){
      if(!this.$store.getters.isLogin){return this.$message.error('请登录')}
      this.$confirm('是否进入考试状态', '小提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('进入考试状态!')
        this.$store.commit('updateIsExam')
        let obj = []
        this.form.num.forEach(val=>{
          obj.push(val.sub_num)
        })
        this.$router.push({name:'page_exam',params:{data:obj}})
      }).catch(() => {
        console.log('取消退出');
      })
    },
    changeSet(bool){
      console.log(bool);
      if(!bool){
        this.$nextTick(()=>{
          this.$refs['form'].resetFields()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-exam{
  .blue{
    color: #409EFF;
  }
  .gray{
    color: #C0C4CC;
  }
}
</style>