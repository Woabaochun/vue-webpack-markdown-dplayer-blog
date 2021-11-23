import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // 去掉url中的#
  routes: [{
      path: '/',
      name: 'home',
      component: resolve => require(['@/views/home.vue'], resolve),
      meta: { title: '首頁', navigation: true ,topbor:true},
      children: [{
        path: 'details',
        name: 'homeDetails',
        component: resolve => require(['@/views/user/details/index.vue'], resolve),
        meta: { title: '首頁', navigation: true ,topbor:false},
      }]
    },
    {
      path: '/seed',
      name: 'seed',
      component: resolve => require(['@/views/seed/seedView.vue'], resolve),
      meta: { title: '熱門', navigation: true ,topbor:true},
      children: [{
        path: 'details',
        name: 'seedDetails',
        component: resolve => require(['@/views/user/details/index.vue'], resolve),
        meta: { title: '熱門', navigation: true ,topbor:false},
      }]
    },
    {
      path: '/video',
      name: 'video',
      component: resolve => require(['@/views/video/videoView.vue'], resolve),
      meta: { title: '視頻', navigation: true ,topbor:true},
      children: [{
        path: 'details',
        name: 'videoDetails',
        component: resolve => require(['@/views/user/details/index.vue'], resolve),
        meta: { title: '視頻', navigation: true ,topbor:false},
      }]
    },
    {
      path: '/contact',
      name: 'contact',
      component: resolve => require(['@/views/contact/contactView.vue'], resolve),
      meta: { title: '公告', navigation: true ,topbor:true},

    },
    {
      path: '/userEdit',
      name: 'userEdit',
      component: resolve => require(['@/views/user/userEdit.vue'], resolve),
      meta: { title: '創作中心', navigation: false ,topbor:false},
      children: [{
          path: 'homePage',
          name: 'homePage',
          component: resolve => require(['@/views/user/page/homePage.vue'], resolve),
          meta: { title: '首頁', navigation: false ,topbor:false},
        },
        {
          path: 'articlePage',
          name: 'articlePage',
          component: resolve => require(['@/views/user/page/articlePage.vue'], resolve),
          meta: { title: '文章管理', navigation: false ,topbor:false},
        },
        {
          path: 'seedPage',
          name: 'seedPage',
          component: resolve => require(['@/views/user/powerPage/seedPage.vue'], resolve),
          meta: { title: '熱門管理', navigation: false ,topbor:false},
        },
        {
          path: 'videoPage',
          name: 'videoPage',
          component: resolve => require(['@/views/user/powerPage/videoPage.vue'], resolve),
          meta: { title: '視頻管理', navigation: false ,topbor:false},
        }
      ]
    }, {
      path: '/Editinit',
      name: 'Editinit',
      component: resolve => require(['@/views/user/EditS.vue'], resolve),
      meta: { title: '寫文章', navigation: false ,topbor:false},
    },
    {
      path: '/preDetails',
      name: 'preDetails',
      component: resolve => require(['@/views/user/details/index.vue'], resolve),
      meta: { title: '查看', navigation: false ,topbor:false},
    },
    {
      path: '*',
      name: '404',
      component: resolve => require(['@/views/404.vue'], resolve),
      meta: { title: '404', navigation: true ,topbor:true},
    }
  ]
})

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
