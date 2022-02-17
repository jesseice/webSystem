import { Message } from "element-ui";

const messageTypes = ["success","error","warn","info"];
const message = {}
messageTypes.forEach((item)=>{
  message[item] = (msg)=>{
    return Message({
      showClose:false,
      type:item,
      message:msg,
      duration:1000
    })
  }
})

export default message