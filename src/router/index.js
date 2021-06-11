import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    redirect: '/discover'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home'),
    // redirect:'/home/discover',
    children: [
      {
        path: '/discover',
        component: () => import('../views/Home/Children/Discover.vue'),
        meta: { title: '发现音乐' },
      },
      {
        path: '/playlists',
        component: () => import('../views/Home/Children/Playlists.vue'),
        meta: { title: '推荐歌单' },
      },
      {
        path: '/songs',
        component: () => import('../views/Home/Children/Songs.vue'),
        meta: { title: '最新音乐' },
      },
      {
        path: '/mvs',
        component: () => import('../views/Home/Children/Mvs.vue'),
        meta: { title: '最新MV' },
      },
      {
        path: '/resuly',
        component: () => import('../views/Home/Children/Result.vue'),
        meta: { title: '搜索结果' },
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title
  next()
})

export default router
