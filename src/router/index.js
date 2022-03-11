import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/view/layout'),
    children:[
      {
        path:'',
        name:'home',
        component: () => import('@/view/home')
      },
      {
        path:'/exam',
        name:'exam',
        component: () => import('@/view/exam'),
        // children:[
        //   {
        //     path:'radexam',
        //     name:'radexam',
        //     component: ()=> import('@/components/subject')
        //   }
        // ]
      },
      {
        path:'/draw',
        name:'draw',
        component: () => import('@/view/draw')
      },
      {
        path:'/question',
        name:'question',
        component: () => import('@/view/question')
      },
    ]
  },
  {
    path:'/page_exam',
    name:'page_exam',
    component:()=> import('@/view/exam/exam')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login')
  },
  {
    path: '*',
    component: () => import('@/view/error')
  },
]

const router = new VueRouter({
  routes
})

export default router
