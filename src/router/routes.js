
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '/index',
        alias: '/', 
        name: 'index',
        component: () => import('pages/Index.vue') 
      },
      {
        path: '/news',
        name: 'newsList',
        component: () => import('pages/News.vue')
      }

    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
