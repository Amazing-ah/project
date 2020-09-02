import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)


const login = () => import('../pages/login/login.vue')
const home = () => import('../pages/home/home.vue')
const index = () => import('../pages/index/index.vue')
const menu = () => import('../pages/menu/menu.vue')
const role = () => import('../pages/role/role.vue')
const admin = () => import('../pages/admin/admin.vue')
const goodsCategory = () => import('../pages/goodsCategory/goodsCategory.vue')
const goodsStandard = () => import('../pages/goodsStandard/goodsStandard.vue')
const goodsManage = () => import('../pages/goodsManage/goodsManage.vue')
const members = () => import('../pages/members/members.vue')
const carousel = () => import('../pages/carousel/carousel.vue')
const secKill = () => import('../pages/secKill/secKill.vue')

//路由独享守卫判断
function beforeEnter(url, next) {
  store.state.user.info.menus_url.some(item => item == url) ? next() : next("/")
}

export const indexRouters = [{
    path: 'menu',
    component: menu,
    name: '菜单管理',
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
  {
    path: 'role',
    component: role,
    name: '角色管理',
    beforeEnter(to, from, next) {
      beforeEnter("/role", next)
    }
  },
  {
    path: 'admin',
    component: admin,
    name: '管理员管理',
    beforeEnter(to, from, next) {
      beforeEnter("/admin", next)
    }
  },
  {
    path: 'goodsCategory',
    component: goodsCategory,
    name: "商品分类",
    beforeEnter(to, from, next) {
      beforeEnter("/goodsCategory", next)
    }
  },
  {
    path: 'goodsStandard',
    component: goodsStandard,
    name: "商品规格",
    beforeEnter(to, from, next) {
      beforeEnter("/goodsStandard", next)
    }
  },
  {
    path: 'goodsManage',
    component: goodsManage,
    name: '商品管理',
    beforeEnter(to, from, next) {
      beforeEnter("/goodsManage", next)
    }
  },
  {
    path: 'members',
    component: members,
    name: '会员管理',
    beforeEnter(to, from, next) {
      beforeEnter("/members", next)
    }
  },
  {
    path: 'carousel',
    component: carousel,
    name: '轮播图管理',
    beforeEnter(to, from, next) {
      beforeEnter("/carousel", next)
    }
  },
  {
    path: 'secKill',
    component: secKill,
    name: '限时秒杀',
    beforeEnter(to, from, next) {
      beforeEnter("/secKill", next)
    }
  },

]



const router = new Router({
  routes: [{
      path: "/login",
      component: login
    },
    {
      path: "/",
      component: index,
      children: [{
          path: "",
          component: home
        },
        ...indexRouters
      ]
    }
  ]
})

//全局拦截
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return;
  }

  if (store.state.user.info.username) {
    next();
    return
  }

  next('/login')
})


export default router;
