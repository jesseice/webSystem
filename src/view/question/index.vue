<template>
  <div class="p-private-topic">
    <div class="p-private-topic__bts" style="margin-bottom:20px">
      <el-button
        type="primary"
        @click="isEdit = true"
        v-if="!isEdit"
        >编辑个人题库</el-button>
      <div class="p-private-topic__bts__edit">
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
      <div class="p-private-topic__bts__create">
        <el-button type="primary"
          @click="addTopic(0)"
          >添加题目</el-button>
        <el-button type="primary"
          @click="addTopic(1)"
          >题目少？去刷题</el-button>
      </div>
    </div>
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width:100%"
      border>
      <template slot="empty"><el-empty description="暂无数据！！！"></el-empty></template>

      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center">
        <template slot-scope="scope">
          <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
        :sortable="item.sortable"
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
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            v-if="isEdit"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
            移除
          </el-button>
          <el-popover
            placement="right"
            width="500"
            trigger="click">
            <el-button
              slot="reference"
              @click.native.prevent="watchTopic(scope.$index, tableData)"
              type="text"
              size="small">
              查看题目
            </el-button>
            <watch-topic :subject="watchSbj"></watch-topic>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      layout="total,prev, pager, next"
      :hide-on-single-page="tableData.length/pageSize <= 1"
      :page-size="pageSize"
      @current-change="handlePage"
      :current-page="currentPage"
      :total="tableData.length">
    </el-pagination>
  </div>
</template>

<script>
import api from '@/api'
import WatchTopic from './components/watch.vue'
export default {
  components:{
    WatchTopic
  },
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
      watchSbj:null,
      currentPage:1,
      pageSize:10,
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
          width:'70',
          sortable:true
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
    async watchTopic(index,rows){
      // console.log(index,rows)
      let ind = (this.currentPage - 1)*this.pageSize + index*1
      let type = rows[ind].subject_type
      let subject_id = rows[ind].subject_id
      let subject_type = (type ==='单选题'&& 0) || (type ==='判断题'&& 1) || (type ==='多选题'&& 2)
      subject_type = subject_type ? subject_type : 0
      const res = await api.watchTopic( {subject_type, subject_id } )
      if(res.code === 200){
        this.$message.success(res.msg)
        this.watchSbj = {
          subject_type: type,
          subject_title: rows[ind].subject_title,
          subject_result: res.data[0].subject_result.split('&&'),
          subject_select: res.data[0].subject_select.split('&&')
        }
      }
    },
    deleteRow(index, rows) {
      let ind = (this.currentPage - 1)*this.pageSize + index*1
      let a = rows.splice(ind, 1) // ****返回一个数组里面是被删元素****
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
    },
    addTopic(type){
      if(type === 0){
        this.$router.push('/draw')
      }else{
        this.$router.push('/exam')
      }
    },
    handlePage(e){
      this.currentPage = e
    }
  }
}
</script>

<style lang="scss" scoped>
.p-private-topic{
  width: 100%;
  .p-private-topic__bts{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>