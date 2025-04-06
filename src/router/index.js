import { createRouter, createWebHistory } from 'vue-router'

//创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path:'/login',component:()=>import('@/views/login/LoginPage.vue')}, //登录页面
    {
      path:'/',
      component:()=> import('@/views/layout/LayoutContainer.vue'),//路由懒加载
      redirect:'/article/channel',  //路由重定向
      // redirect:'/login',
      children:[
      {
         path:'/article/manage',
         component:()=> import('@/views/article/ArticleManage.vue')
      },
      {
        path:'/article/channel',
        component:()=>import('@/views/article/ArticleChannel.vue')
      },
       {
        path:'/user/profile',
        component:()=>import('@/views/user/UserProfile.vue')
      },
       {
        path:'/user/avatar',
        component:()=>import('@/views/user/UserAvatar.vue')
      },
       {
        path:'/user/password',
        component:()=>import('@/views/user/UserPassword.vue')
      }
    ]
    }
  ]
})

export default router
