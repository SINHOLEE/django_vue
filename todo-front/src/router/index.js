import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login' // === ../views/Login, or src/views/Login

Vue.use(VueRouter)

// 우리가 만질 부분
const routes = [
  // 각 아이템 하나하나가 오브젝트이고, 오브젝트 하나하나가 어떤 경로로 들어ㅗ왔을 때 어떤 컴포넌트를 보여줄 지 
  // 알려주는 공간
  // urls.py와 같은 역할을 한다.
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
