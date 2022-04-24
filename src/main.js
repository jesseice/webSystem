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
let pro_url = process.env.VUE_APP_API_URL
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
