<template>
    <div class="p-chat">
    <div class="p-chat-left">
      <div class="p-chat-search">
        <el-input placeholder="搜索用户" v-model="searchTxt" class="input-with-select" size="mini">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="p-chat-lists">
        <friend-list
         v-for="(item,index) in friend_list"
         :key="item.friend_id"
         :friInfo="item"
         :index="index"
         :curIndex="curIndex"
         @atFriend = atFriend
        ></friend-list>
      </div>
    </div>
    <keep-alive>
      <div class="p-chat-right">
        <div class="p-chat-print">
          <div class="p-chat-print__title">
            {{ friend_title }}
          </div>
          <div ref="msgBox" class="p-chat-print__msg">
            <!-- 遍历聊天记录数据/msg-box为每一条信息 -->
            <msg-box
              v-for="(item,index) in msgs[curIndex]" :key="item[1]+index"
              :content="item[1]"
              :point="item[0]"
              :friAvatar="friend_list&&friend_list[curIndex]&&friend_list[curIndex].friend_avatar"
            ></msg-box>
          </div>
        </div>
        <textarea
          class="p-chat-input"
          v-model="txt"
          placeholder="请输入信息"
          @keydown.enter="send"></textarea>

        <!-- 占位 -->
        <div class="p-chat-po"></div>
        <el-button
          class="p-bt"
          type="success"
          plain
          @click="send"
          >发送(S)</el-button>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import FriendList from './components/friendList'
import MsgBox from './components/msgBox'
import api from '@/api'
export default {
   /**
   *@param txt 输入框文本
   *@param searchTxt 搜索框文本
   *@param friend_list 好友列表信息
   *@param friend_title 盒子标题
   *@param curIndex 当前选中的好友
   *@param msgs 好友列表中所有好友与自己的信息集合
   */
  components:{
    FriendList,
    MsgBox
  },
  async created(){
    // 获取好友列表
    const res =await api.getFriendList()
    if(res.code === 200){
      this.friend_list = res.data
      this.$message.success(res.msg)
      this.$nextTick(()=>{
        // 初始化列表第一个好友的聊天界面
        this.atFriend(this.friend_list[0],0)
        for(let i =0;i< this.friend_list.length;i++){
          this.msgs.push([])
        }
      })
    }else{
      this.$message.error(res.msg)
    }
    console.log(this.friend_list)
    // 获得当前好友的socketid
    this.$socket.on('get friend socketid',(my_socketid,fri_socketid)=>{
      this.cur_fri_socket_id = fri_socketid
    })

    // 监听私聊信息
    this.$socket.on('private message',(fri_socketid,msg,authorName)=>{
      console.log('接收到的信息：',msg,'来自',authorName)
      this.msgs[this.curIndex].push(['left',msg])
      this.scrollBottom()
    })
  },
  mounted(){
    this.scrollBottom()
  },
  data() {
    return {
      txt: '',
      searchTxt:'',
      friend_list:null,
      friend_title:'',
      curIndex:0,
      cur_fri_socket_id :'',
      // msg:[], // [fri_name:['left','在吗'],['right','在啊,怎么了']],
      msgs:[]
    };
  },
  methods:{
    send(){
      this.txt = this.txt.trim()
      let txt = this.txt
      if(this.txt === ''){
        return this.$message.info('请输入内容，才能发送')
      }
      let authorName = JSON.parse(window.sessionStorage.getItem('USER_INFO')).user_name
      this.$socket.emit('private message',this.cur_fri_socket_id,txt,authorName)
      this.msgs[this.curIndex].push(['right',txt])
      this.scrollBottom()
      this.txt = this.$options.data().txt
    },
    // 点击好友列表某一项
    atFriend(friend,curIndex){
      // friend.user_name
      let curFriName = friend.user_name
      // console.log(friend)
      this.$socket.emit('find friend socketid',curFriName)
      this.curIndex = curIndex
      this.friend_title = friend.friend_name
    },
    scrollBottom(){
      this.$refs['msgBox'].scrollTo({
      top:this.$refs['msgBox'].scrollHeight,
      behavior:'smooth'
    })
    }
  }
}
</script>

<style lang="scss" scoped>
.p-chat{
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;
  width: 835px;
  height: 650px;
  border: 1px rgb(218, 211, 211) solid;
  box-sizing: border-box;
  display: flex;
  .p-chat-left{
    width: 237px;
    height: 100%;
    overflow: hidden;
    border-right: 1px rgb(218, 211, 211) solid;
    .p-chat-search{
      height: 65px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 0 10px;
    }
    .p-chat-lists{
      height: 583px;
      width: 237px;
      // background-color: #a9a6a621;
      overflow:scroll;
    }
    .p-chat-lists::-webkit-scrollbar{
      /*滚动条整体样式*/
      /*高宽分别对应横竖滚动条的尺寸*/ 
      width: 5px;
      height: 0;
    }
    .p-chat-lists::-webkit-scrollbar-thumb{
      /*滚动条里面小方块*/
      border-radius: 10px;
      background: #929292;
      box-shadow: inset 0 0 5px rgba(129, 136, 141, .5);
    }
  }

  .p-chat-right{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;

    .p-chat-print{
      width: 100%;
      // flex-grow: 1.2;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .p-chat-print__title{
        height: 65px;
        box-sizing: border-box;
        padding: 0 10px;
        text-align: left;
        line-height: 65px;
      }
      .p-chat-print__msg{
        // flex-grow: 1;
        height: 456px;
        padding: 10px;
        box-sizing: border-box;
        // overflow: hidden;
        overflow-y: auto;
        border-bottom: 1px rgb(218, 211, 211) solid;
        border-top: 1px rgb(235, 230, 230) solid;
      }
    }

    .p-chat-input{
      width: 100%;
      flex-grow: 1;
      resize: none;
      box-sizing: border-box;
      font-size: 20px;
      border: 0px;
      padding: 10px;
      outline:none;
    }

    .p-chat-po{
      width: 100%;
      height: 55px;
    }

    .p-bt{
      position: absolute;
      right: 10px;
      bottom: 5px;
    }
  }
}
</style>