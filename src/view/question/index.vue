<template>
  <div class="c-private-topic">
    <div style="margin-bottom:20px">
      <el-button
        type="primary"
        @click="isEdit = true"
        v-if="!isEdit"
        >编辑个人题库</el-button>
      <el-button type="primary"
        v-if="isEdit"
        @click="onSave"
        :loading="isloading"
        >{{isloading?'保存中...':'保存修改'}}</el-button>
      <el-button
        type="primary"
        v-if="isEdit"
        plain
        @click="onCancel"
        >取消编辑</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width:100%"
      border>
      <template slot="empty"><el-empty description="暂无数据！！！"></el-empty></template>

      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
        >
      </el-table-column>
      <el-table-column
        prop="subject_tag"
        label="标签"
        align="center"
        >
        <template slot-scope="scope">
          <el-tag 
            style="margin-right:10px"
            v-for="(a,i) in scope.row.subject_tag"
            :key="i"
            disable-transitions>{{scope.row.subject_tag[i]}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isEdit"
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '@/api'
export default {
  async created(){
    let res = await api.getPrivateTopic()
    let newRes = res.map(val=>{
      return {
        privateTopic_id:val.pri_id,
        subject_title:val.sbj_title,
        subject_id:val.sbj_id,
        subject_type:val.sbj_type === 0 && '单选题' || val.sbj_type === 1 && '判断题' || val.sbj_type === 2 && '多选题',
        subject_tag:val.sbj_tag
      }
    })
    this.initData = [...newRes]
    this.tableData = [...newRes]
  },
  data() {
    return {
      initData:[],
      tableData: [
        // {
        //   subject_title:'这是题目！',
        //   subject_type: '单选题',
        //   subject_tag: ['JavaScript','react']
        // }
      ],
      columns:[
        {
          prop:'privateTopic_id',
          label:'题库id',
          align:'center',
          width:'50'
        },
        {
          prop: 'subject_title',
          label:'题目'
        },
        {
          prop: 'subject_type',
          label:'题型',
          align:"center",
          width:'70'
        },
      ],
      deleteArr:[],
      isEdit:false,
      isloading:false
    }
  },
  methods:{
    deleteRow(index, rows) {
      let a = rows.splice(index, 1) // ****返回一个数组里面是被删元素****
      this.deleteArr.push(...a)
    },
    onSave(){
      if(this.deleteArr.length === 0){
        return false
      }
      this.isloading = true
      this.$confirm('是否保存修改,成功后将无法恢复操作前的数据', '小提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        console.log('deleteArr:',this.deleteArr)
        const pri_ids = this.deleteArr.map(val=>val.privateTopic_id)
        const res = await api.collectTopic({pri_ids})
        console.log('res:',res)
        if(res.code === 200){
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }
        this.isEdit = false
        this.initData = [...this.tableData]
        this.isloading = false
      }).catch(() => {
        console.log('取消退出');
      })
    },
    onCancel(){
      this.isEdit = false
      this.tableData =[...this.initData]
    }
    ///// 创建题目自动生成到个人题库
  }
}
</script>

<style lang="scss" scoped>
.c-private-topic{

}
</style>