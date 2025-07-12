const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  {
    path: '/cabecalho',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/Cabecalho.vue') }
    ]
  },

  {
    path: '/produto',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'list', component: () => import('pages/produto/produto-list.vue') },
      { path: 'form', component: () => import('pages/produto/produto-form.vue') },
    ]
  },

  {
    path: '/produto/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Produto.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
