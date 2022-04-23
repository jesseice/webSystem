import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/variable.scss'
import message from './util/message'
import '@/styles/reset.css';
import { io } from "socket.io-client";
import VueParticles from 'vue-particles'
// 服务器地址
const produce = true
let pro_url = 'http://127.0.0.1:3000/'
if (produce) {
  pro_url = 'http://112.74.175.17:5000/'
}

const socket = io(pro_url)

Vue.use(ElementUI);
Vue.use(VueParticles)

Vue.config.productionTip = false
Vue.prototype.$message = message
Vue.prototype.$socket = socket

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
