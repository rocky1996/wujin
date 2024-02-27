import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/login',      //自定义访问页面
    name: '登录页面',   //自定义
    component: () => import('../views/login.vue')  //这里对应新建页面的路径
  },
  {
    path: '/trainer',      //自定义访问页面
    name: '管理员页面',   //自定义
    component: () => import('../views/Trainer.vue')  //这里对应新建页面的路径
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router