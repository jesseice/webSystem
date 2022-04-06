<template>
  <div class="c-chat_main">
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
          :whoSendMsgs="whoSendMsgs"
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
                v-for="(item,index) in msgs[this.cur_fri_name]" :key="item[1]+index"
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
      <div class="p-chat__person">
        <el-tooltip class="item" effect="dark" :content="my_name" placement="left">
          <img :src="my_avatar" width="40px" height="40px" alt="头像">
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="返回主页" placement="left">
          <i class="el-icon-house" @click="goHome"></i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import FriendList from './components/friendList'
import MsgBox from './components/msgBox'
import {getItem, setItem} from '@/util/storage'
import api from '@/api'
const chatKey = 'chatInfoTag'
export default {
   /**
   *@param txt 输入框文本
   *@param searchTxt 搜索框文本
   *@param friend_list 好友列表信息
   *@param friend_title 盒子标题
   *@param curIndex 当前选中的好友
   *@param msgs 好友列表中所有好友与自己的信息集合{friName:[['left',121],[]]}
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
        // 获取聊天记录
        let msg_obj = getItem(this.my_name+chatKey)
        if(msg_obj&&Object.values(msg_obj).length>0){

          this.msgs = {...msg_obj}
          
        }
        for(let i =0;i< this.friend_list.length;i++){
          if(!this.msgs[this.friend_list[i].user_name]){
            console.log(1);
            this.msgs[this.friend_list[i].user_name] = []
          }
        }
      })
    }else{
      this.$message.error(res.msg)
    }
    console.log(this.friend_list)
    // 获得当前好友的socketid
    this.$socket.on('find friend socketid',(my_socketid,fri_socketid)=>{
      this.cur_fri_socket_id = fri_socketid
      console.log('获取到的好友的socketid为',this.cur_fri_socket_id);
    })

    // 监听离线消息
    this.$socket.on('check leave msg',(authorName,msg)=>{
      console.log(`收到${authorName}发的消息：`,msg)

      this.whoSendMsgs.set(authorName,true)
      

      this.$nextTick(()=>{
        this.msgs[authorName].push(['left',msg])
      })
    })

    // 获取是否有离线消息
    this.$socket.emit('check leave msg',this.my_name)
    // 告诉服务器我在聊天页面了
    this.$socket.emit('is in chat page',this.my_name,true)

    // 监听私聊信息
    this.$socket.on('private message',(fri_socketid,msg,authorName)=>{
      console.log('接收到的信息：',msg,'来自',authorName)

      this.whoSendMsgs.set(authorName,true)

      // 此处的authorName不要改成this.this.cur_fri_name
      this.msgs[authorName].push(['left',msg])
      this.$forceUpdate()
      this.scrollBottom()
    })
  },
  mounted(){
    // 监听浏览器刷新，关闭事件
    // 页面加载时只执行 onload 事件。
    // 页面关闭时，先 onbeforeunload 事件，再 onunload 事件。
    // 页面刷新时先执行 onbeforeunload事件，然后 onunload 事件，最后 onload 事件
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  beforeDestroy(){
   this.setChatInfo(this.my_name)
   window.removeEventListener('beforeunload',this.beforeunloadFn)
  },
  data() {
    return {
      txt: '',
      searchTxt:'',
      friend_list:null,
      friend_title:'',
      curIndex:0,
      cur_fri_socket_id :'',
      cur_fri_name:'',
      my_avatar:JSON.parse(window.sessionStorage.getItem('USER_INFO')).user_avatar||'',
      my_name:JSON.parse(window.sessionStorage.getItem('USER_INFO')).user_name||'',
      // msg:[], // fri_name:[['left','在吗'],['right','在啊,怎么了']],
      msgs:{}, // {fri_name:[['left','在吗'],['right','在啊,怎么了']],fri_name:[['left','在吗'],['right','在啊,怎么了']]}
      whoSendMsgs:new Map() // 谁发了消息，我是未读的
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
      this.$socket.emit('private message', this.cur_fri_socket_id, this.cur_fri_name, txt, authorName)
      this.msgs[this.cur_fri_name].push(['right',txt])
      this.$forceUpdate()
      // this.$set(this.msgs,this.cur_fri_name,[['right',txt]])
      // this.$set(this.msgs[this.cur_fri_name],this.msgs[this.cur_fri_name].length,[['right',txt]])
      this.scrollBottom()
      this.txt = this.$options.data().txt
    },
    // 点击好友列表某一项
    atFriend(friend,curIndex){
      // friend.user_name
      this.cur_fri_name = friend.user_name

      if(this.whoSendMsgs.has(friend.user_name)){
        this.whoSendMsgs.delete(friend.user_name)
      }
      // console.log(friend)
      this.$socket.emit('find friend socketid',friend.user_name)
      this.curIndex = curIndex
      this.friend_title = friend.friend_name
    },
    // 使最新信息在一直处于聊天框底部
    scrollBottom(){
     this.$nextTick(()=>{
        this.$refs['msgBox'].scrollTo({
          top:this.$refs['msgBox'].scrollHeight,
          behavior:'smooth'
        })
     })
    },
    // 回主页
    goHome(){
      this.$router.go(-1)
    },
    // 监听浏览器刷新，关闭处理函数
    beforeunloadFn(){
      this.setChatInfo(this.my_name)
    },
    setChatInfo(cur_user_name){
      setItem(cur_user_name+chatKey,this.msgs)
      this.$socket.emit('is in chat page',this.my_name,false)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-chat_main{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // background: linear-gradient(-180deg, #dcf2e6 0%, #ffffff 100%);
  background-image: url('~@/assets/img/news_bg.jpg');
  background-position: center -50px;
  background-size: cover;
  background-repeat: no-repeat;
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
      background: #fff;
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
      background: #fff;
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

    .p-chat__person{
      position: absolute;
      transform: translate(100%,0);
      right: 0;
      top: 0;
      width: 60px;
      height: 100%;
      padding: 10px 0px;
      box-sizing: border-box;
      background: rgb(66, 122, 108);

      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 20px;
      .item{
        font-size: 25px;
        color: #fff;
      }
      .item:hover{
          cursor: pointer;
      }
    }
  }
}
</style>