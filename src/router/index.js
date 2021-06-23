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
        name: 'discover',
        component: () => import('@/views/Discover'),
        meta: { title: '发现音乐' },
      },
      {
        path: '/qualitySongList',
        name: 'qualitySongList',
        component: () => import('@/views/QualitySongList'),
        meta: { title: '精品歌单' },
      },
      {
        path: '/newMusic',
        name: 'newMusic',
        component: () => import('@/views/NewMusic'),
        meta: { title: '最新音乐' },
      },
      {
        path: '/mvs',
        name: 'mvs',
        component: () => import('@/views/MVs'),
        meta: { title: '推荐MV' },
      },
      {
        path: '/result',
        name: 'result',
        component: () => import('@/views/Result'),
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
