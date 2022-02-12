import Vue from 'vue'
import { Message } from "element-ui";

const messageTypes = ["success","errr","warn","info"];
const message = {}
messageTypes.forEach((item)=>{
  message[item] = (msg)=>{
    return Message({
      showClose:true,
      type:item,
      message:msg
    })
  }
})

Vue.prototype.$message = message