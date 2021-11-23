import Vue from 'vue';
import axios from 'axios';
import store from '../store';
import router from '../router';
import crypto from '../tools';
import cookies from 'js-cookie';
import { Dialog } from 'vant';
import { Toast } from 'vant';

function getCookie(name) {
  if (name == 'x_token') {
    if (cookies.get('HD')) {
      return crypto.Decrypt(cookies.get('HD')).x_token;
    }
    return "";
  }
  return "";
}

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  config.headers.common['Access-Control-Allow-Origin']='*'; //setting request.headers
  //在发送请求之前做某件事
  // //加密密码
  // if (config.url === process.env.API_HOST_BLOG_USER + '/user/login' || config.url === process.env.API_HOST_BLOG_USER + '/user/userRegister') {
  //   config.data.password = crypto.encryption(config.data.password);
  //   consos.log(data.password);
  // }
  return config;
}, (error) => {
  // console.log('错误的传参')
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  //对响应数据做些事
  if (!res.data) {
    return Promise.resolve(res);
  }
  return res;
}, (error) => {
  Toast({
    icon: 'fail',
    message: '服務繁忙，請稍後再試!'
  });
  store.commit('setEmptyOptions', 'network');
  return Promise.reject(error);
});

function $fetch(method, url, data, async) {
  store.commit('showLoading');
  return new Promise((reslove, reject) => {
    axios({
      method,
      url,
      async: async,
      data: crypto.encryption(data),
      headers: {
        'X-Token': getCookie('x_token'),
      },
    }).then(res => {
      store.commit('hideLoading');
      store.commit('setEmptyOptions', 'search');
      let body = res;
      if (body.status == 200) {
        if (body.data.ret == 0) {
          body.data.data = crypto.jsonDecrypt(body.data.data);
          reslove(body);
        } else if (body.data.ret == 40002) {
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
              reject(body);
            })
            .catch(() => {
              router.push('/');
              reject(body);
            });
        } else {
          reject(body);
        }
      } else {
        reject(body);
      }
    }).catch(err => {
      store.commit('hideLoading');
      if (err.request)
        if (err.request.status == 504) {
          Toast({
            icon: 'fail',
            message: '無法連接到服務器'
          });
          store.state.TOKEN = null;
          store.state.avatarimgUrl = '';
          store.state.userMessage = null;
          cookies.remove('HD');
        }
      reject(err);
    });
  });
};

function $fetchNoLiading(method, url, data, async) {
  return new Promise((reslove, reject) => {
    axios({
      method,
      url,
      async: async,
      data: crypto.encryption(data),
      headers: {
        'X-Token': getCookie('x_token'),
      },
    }).then(res => {
      let body = res;
      store.commit('setEmptyOptions', 'search');
      if (body.status == 200) {
        if (body.data.ret == 0) {
          // debugger
          body.data.data = crypto.jsonDecrypt(body.data.data);
          reslove(body);
        } else if (body.data.ret == 40002) {
          cookies.remove('HD');
          store.state.TOKEN = null;
          Dialog.confirm({
              message: '您需要登錄後才能繼續,點擊確認將前往登錄.',
              confirmButtonColor: "#e35885"
            })
            .then(() => {
              store.commit('showLogin');
              router.push('/');
              reject(body);
            })
            .catch(() => {
              router.push('/');
              reject(body);
            });
        } else {
          reject(body);
        }
      } else {
        reject(body);
      }
    }).catch(err => {
      if (err.request)
        if (err.request.status == 504) {
          Toast({
            icon: 'fail',
            message: '無法連接到服務器'
          });
          store.state.TOKEN = null;
          store.state.avatarimgUrl = '';
          store.state.userMessage = null;
          cookies.remove('HD');
        }
      reject(err);
    });
  });
};
//注销登录
const cancellationLogin = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/user/cancellationLogin', data, true);
//校验token是否有效
const registerToken = (data) => $fetchNoLiading('post', process.env.API_HOST_BLOG_USER + '/user/registerToken', data, false);
// 首页初始化数据
const initHome = () => $fetch('get', 'list');
// 用户注册
const userRegister = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/user/userRegister', data, true);
// 登录
const login = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/user/login', data, true);
//当前用户获取验证码
const loginNameCode = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/user/getCode', data, true);
//忘记密码当前用户获取验证码
const passNameCode = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/user/getPassCode', data, true);
//注册邮箱获取验证码
const getEmailCode = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/user/getEmailCode', data, true);
//注册账号邮箱获取验证码
const getRegisterEmailCode = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/user/getRegisterEmailCode', data, true);
//忘记密码设置新密码
const setPassword = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/user/setPassword', data, true);
//当前用户修改密码获取验证token
const getPassModifyToken = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/user/getPassModifyToken', data, true);

//需要登录后才能操作的借口
//更新头像昵称
const updataUser = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/user/updataUser', data, true);
//文章查询
const selectUserBlogPageNumber = (data) => $fetch('post', process.env.API_HOST_BLOG_ARTICLE + '/userblog/selectUserBlogPageNumber', data, true);
const selectUserSeedPageNumber = (data) => $fetch('post', process.env.API_HOST_BLOG_ARTICLE + '/userblog/selectUserSeedPageNumber', data, true);
const selectUserVideoPageNumber = (data) => $fetch('post', process.env.API_HOST_BLOG_ARTICLE + '/userblog/selectUserVideoPageNumber', data, true);
//创建文章
const addArticle = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/interactive/addArticle', data, true);
//更新文章
const updataArticle = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/interactive/updataArticle', data, true);
//删除文章
const dropArticle = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/interactive/dropArticle', data, true);
//查看文章
const seeArticle = (data) => $fetch('post', process.env.API_HOST_BLOG_USER + '/interactive/seeArticle', data, true);


//对公接口
//文章查询
const selectBlogPageNumber = (data) => $fetchNoLiading('post', process.env.API_HOST_BLOG_ARTICLE + '/blog/selectBlogPageNumber', data, true);
const selectSeedPageNumber = (data) => $fetchNoLiading('post', process.env.API_HOST_BLOG_ARTICLE + '/blog/selectSeedPageNumber', data, true);
const selectVideoPageNumber = (data) => $fetchNoLiading('post', process.env.API_HOST_BLOG_ARTICLE + '/blog/selectVideoPageNumber', data, false);
const blogSeeArticle = (data) => $fetch('post', process.env.API_HOST_BLOG_ARTICLE + '/blog/seeArticle', data, false);

export default {
  cancellationLogin: cancellationLogin,
  registerToken: registerToken,
  initHome: initHome,
  userRegister: userRegister,
  login: login,
  loginNameCode: loginNameCode,
  passNameCode: passNameCode,
  getEmailCode: getEmailCode,
  getRegisterEmailCode: getRegisterEmailCode,
  setPassword: setPassword,
  getPassModifyToken: getPassModifyToken,
  selectBlogPageNumber: selectBlogPageNumber,
  selectSeedPageNumber: selectSeedPageNumber,
  selectVideoPageNumber: selectVideoPageNumber,
  blogSeeArticle: blogSeeArticle,
  selectUserBlogPageNumber: selectUserBlogPageNumber,
  selectUserSeedPageNumber: selectUserSeedPageNumber,
  selectUserVideoPageNumber: selectUserVideoPageNumber,
  addArticle: addArticle,
  updataArticle: updataArticle,
  dropArticle: dropArticle,
  seeArticle: seeArticle,
  updataUser: updataUser,
}
