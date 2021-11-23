// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store';
import Vuex from 'vuex';
import FetchAxios from './api';
import ElementUI from 'element-ui';
import { Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import { Loading } from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';
import { Skeleton } from 'vant';
import { List, Image, Search } from 'vant';
import { PullRefresh } from 'vant';
import { Dialog } from 'vant';
import { Empty } from 'vant';
import 'vant/lib/index.css';
import pinyin from 'js-pinyin'
import cookies from 'js-cookie';


import MarkdownPreview from '@/components/markdown/preview';
import MarkdownEdit from '@/components/markdown/htmlEdit';

//外部icon引入
import './assets/icon/iconfont.css';
import './assets/blog_icon/iconfont.css';
import '@/assets/icon_svg'
//引入Amaze UI css样式
// import './assets/dist/css/amazeui.css';
// import './assets/dist/css/amazeui.flat.css';
import crypto from './tools';



import vueCustomElement from 'vue-custom-element'
import proportion from 'vue-proportion-directive';

Vue.use(proportion);
Vue.use(vueCustomElement);

// use
// Vue.use(Dialog);
Vue.use(Loading);
Vue.use(List).use(Image).use(Search);
Vue.use(PullRefresh);
Vue.use(Skeleton);
Vue.use(Vuex);
Vue.use(Vant);
Vue.use(Popup);
Vue.use(ElementUI);
Vue.use(pinyin);
Vue.use(Empty);

Vue.prototype.$Dialog = Dialog;
Vue.prototype.$cookies = cookies;
Vue.prototype.crypto = crypto;
Vue.prototype.ios = FetchAxios;
Vue.prototype.$message = Toast;

import UI from '@/components';
import Navigation from '@/components/Navigation/navigation.vue';
import Login from '@/components/Login/login';
import Personal from '@/components/Login/personalCenter';



(function(w) {
  if (!("WebSocket" in w && 2 === w.WebSocket.CLOSING)) {
    var d = document.createElement("div");
    d.className = "browsehappy";
    d.innerHTML = '<div style="width:100%;height:100vh;font-size:20px;line-height:100px;text-align:center;background-color:#E90D24;color:#fff;margin-bottom:40px;">你的浏览器实在<strong>太太旧了</strong>，太太旧了 <a target="_blank" href="http://browsehappy.osfipin.com/" style="background-color:#31b0d5;border-color: #269abc;text-decoration: none;padding: 6px 12px;background-image: none;border: 1px solid transparent;border-radius: 4px;color:#FFEB3B;">立即升级</a></div>';
    var f = function() {
      var s = document.getElementsByTagName("body")[0];
      if ("undefined" == typeof(s)) {
        setTimeout(f, 10)
      } else { s.insertBefore(d, s.firstChild) }
    };
    f()
  }
}(window));


// mian.js
Vue.use(UI);


Vue.component('Navigation', Navigation);
Vue.component('Login', Login);
Vue.component('Personal', Personal);
Vue.component('MarkdownEdit', MarkdownEdit);
Vue.component('MarkdownPreview', MarkdownPreview);


Vue.config.productionTip = false;
let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/g);

if (flag) {
  store.commit('moveheader');
} else {
  store.commit('pcheader');
}

//验证登陆信息是否存在并且是否有效
if (cookies.get('HD')) {
  var cook = crypto.Decrypt(cookies.get('HD'));
  store.state.TOKEN = cook;
  FetchAxios.registerToken(null).then(res => {
    if (res.data.ret == 0) {
      let token = res.data.data;
      token.update = new Date();
      store.state.avatarimgUrl = token.avatarimgUrl;
      store.state.userMessage = token.userMessage;
      if (token.userMessage == 'null') {
        store.state.userMessage = null;
      }
      store.state.TOKEN = token;
      cookies.remove('HD');
      cookies.set('HD', crypto.encryption(token), { expires: 1 });
    } else {
      store.state.TOKEN = null;
      store.state.avatarimgUrl = '';
      store.state.userMessage = null;
      cookies.remove('HD');
      router.push('/');
    }
  }).catch(e => {});
}

//校验需要登录验证的路由
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => !res.meta.navigation)) { // 验证是否需要登陆
    if (flag) {
      Toast({
        icon: 'fail',
        message: '请前往PC端页面进行操作！'
      });
      router.push('/');
    }
    if (cookies.get('HD')) { // 查询本地存储信息是否已经登陆
      var cook = crypto.Decrypt(cookies.get('HD'));
      var userInfo = cook;
      var dateBegin = new Date();
      var dateEnd = new Date(userInfo.update);
      var dateDiff = dateBegin.getTime() - dateEnd.getTime(); //时间差的毫秒数
      var seconds = Math.round(dateDiff / 1000); //转换成秒
      //计算超时清楚缓存
      if (seconds >= 86400) {
        cookies.remove('HD');
        store.state.TOKEN = null;
        store.state.avatarimgUrl = '';
        store.state.userMessage = null;
        Dialog.confirm({
            message: '您需要登錄後才能繼續,點擊確認將前往登錄.',
            confirmButtonColor: "#e35885"
          })
          .then(() => {
            store.commit('showLogin');
            router.push('/');
          })
          .catch(() => {
            router.push('/');
          });
      } else {
        store.state.avatarimgUrl = userInfo.avatarimgUrl;
        store.state.userMessage = userInfo.userMessage;
        if (userInfo.userMessage == 'null') {
          store.state.userMessage = null;
        }
        store.state.TOKEN = userInfo;
        next();
      }
    } else {
      cookies.remove('HD');
      store.state.TOKEN = null;
      store.state.avatarimgUrl = '';
      store.state.userMessage = null;
      Dialog.confirm({
          message: '您需要登錄後才能繼續,點擊確認將前往登錄.',
          confirmButtonColor: "#e35885"
        })
        .then(() => {
          store.commit('showLogin');
          router.push('/');
        })
        .catch(() => {
          router.push('/');
        });
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  http: {
    root: '/',
    headers: {
      'Access-Control-Allow-Headers':'X-Requested-With',
      'Access-Control-Allow-Methods':'GET,POST,OPTIONS',
      'Access-Control-Allow-Origin': '*',

    }
  }
})
