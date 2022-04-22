// 引入Vue和路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册路由
Vue.use(VueRouter)
// 对路由信息进行配置
const routes = [
  {
    // url为'/'时匹配的路,layout组件中有路由的出口<router-view>,用来展示其他页面如children中的路由
    path: '/',
    component: () => import('@/view/layout'),
    children:[
      // 首页
      {
        path:'',
        name:'home',
        component: () => import('@/view/home'),
        children:[
          // 首页
          {
            path: '',
            name: 'home1',
            component: () => import('@/view/home/views/home.vue')
          },
          // 个人资料设置
          {
            path: '/set',
            name: 'set',
            component: () => import('@/view/home/views/set.vue')
          },
        ]
      },
      // 模拟考试页
      {
        path:'/exam',
        name:'exam',
        component: () => import('@/view/exam'),
      },
      // 创建题目页
      {
        path:'/draw',
        name:'draw',
        component: () => import('@/view/draw')
      },
      // 个人题库页
      {
        path:'/question',
        name:'question',
        component: () => import('@/view/question')
      },
    ]
  },
  // 考试
  {
    path:'/page_exam',
    name:'page_exam',
    component:()=> import('@/view/exam/exam')
  },
  // 登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login')
  },
  // 消息中心页面
  {
    path:'/news',
    name:'news',
    component: () => import('@/view/news')
  },
  // 错误地址时跳转的路由
  {
    path: '*',
    component: () => import('@/view/error')
  },
]

// 将routes作为路由的配置项，然后导出router
const router = new VueRouter({
  routes
})

export default router
