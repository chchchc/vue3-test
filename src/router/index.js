import { createRouter, createWebHistory } from 'vue-router'
export const routeSettings = {
  isAsync: true, // 动态路由,不同角色进入不同项目页面
  defaultRoles: ["DEFAULT_ROLE"],// 默认角色
}

const Layout = () => import('@/views/Layout.vue')

// 常驻路由
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/HomeView.vue'),
        name: 'HomeView',
        meta: {
          title: '首页',
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: '登录',
      hidden: true, //不显示在菜单栏
    }
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: '关于'
    },
    children: [
      {
        path: 'testMenu1',
        name: 'TestMenu1',
        component: () => import('@/views/TestMenu1.vue'),
        meta: {
          title: '测试菜单1'
        },
        children: [
          {
            path: 'testMenu1-1',
            name: 'TestMenu11',
            component: () => import('@/views/TestMenu11.vue'),
            meta: {
              title: '测试菜单1-1'
            }
          }
        ]
      }
    ]
  }
]

// 动态路由
export const dynamicRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      title: '权限管理',
      roles: ["admin", "editor"],// 可以在根路由中设置角色
    },
    children: [
      {
        path: 'page', //会被/permission/page匹配的
        component: () => import('@/views/Permission/PagePermission.vue'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin']// 或者在子导航中设置角色
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/Permission/DirectivePermission.vue'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限',// 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色

        }
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

//重置路由
export const resetRouter = () => {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}
export default router
