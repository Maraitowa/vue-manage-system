import {createRouter, createWebHistory} from "vue-router"
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: '系统首页'
        },
        component: () => import("../views/Dashboard.vue")
      },
      {
        path: "/table",
        name: "table",
        meta: {
          title: '基础表格'
        },
        component: () => import("../views/BaseTable.vue")
      },
      {
        path: "/tabs",
        name: "tabs",
        meta: {
          title: 'Tab选项卡'
        },
        component: () => import("../views/Tabs.vue")
      },
      {
        path: "/form",
        name: "form",
        meta: {
          title: '基本表单'
        },
        component: () => import("../views/BaseForm.vue")
      },
      {
        path: "/mdeditor",
        name: "mdeditor",
        meta: {
          title: 'markdown编辑器'
        },
        component: () => import("../views/MdEditor.vue")
      },
      {
        path: "/rteditor",
        name: "rteditor",
        meta: {
          title: '富文本编辑器'
        },
        component: () => import("../views/RtEditor.vue")
      },
      {
        path: "/upload",
        name: "upload",
        meta: {
          title: '文件上传'
        },
        component: () => import("../views/Upload.vue")
      },
      {
        path: "/icon",
        name: "icon",
        meta: {
          title: '自定义图标'
        },
        component: () => import("../views/Icon.vue")
      },
      {
        path: "/charts",
        name: "charts",
        meta: {
          title: 'schart图表'
        },
        component: () => import("../views/BaseCharts.vue")
      },
      {
        path: "/i18n",
        name: "i18n",
        meta: {
          title: '国际化语言'
        },
        component: () => import("../views/I18n.vue")
      },
      {
        path: "/permission",
        name: "permission",
        meta: {
          title: '权限管理',
          permission: true
        },
        component: () => import("../views/Permission.vue")
      },
      {
        path: "/403",
        name: "403",
        meta: {
          title: '没有权限'
        },
        component: () => import("../views/403.vue")
      },
      {
        path: "/404",
        name: "404",
        meta: {
          title: '找不到页面'
        },
        component: () => import("../views/404.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: '登录'
    },
    component: () => import("../views/Login.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem('ms_username')
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {
    // 模拟管理员权限
    role === 'admin' ? next() : next('/403');
  } else {
    next()
  }
})

export default router
