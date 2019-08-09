/**
 * @file 封装axios
 * @author SillyBorz <wcnb233@163.com>
 * @version 1.0
 */

import axios from 'axios'; // * 引入axios
import router from '../router'; // * 引入路由

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/signin'
    /* query: {
      redirect: router.currentRoute.fullPath
    } */
  });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param {*} error 请求失败的参数
 */

const errorHandle = (status, error) => {
  // 响应错误
  switch (status) {
    case 400:
      error.message = '错误请求';
      break;
    case 401:
      toLogin();
      // error.message = '未授权，请重新登录';
      error.message = '您的令牌已失效！请重新登录！';
      break;
    case 403:
      error.message = '拒绝访问';
      break;
    case 404:
      error.message = '请求错误,未找到该资源';
      break;
    case 405:
      error.message = '请求方法未允许';
      break;
    case 408:
      error.message = '请求超时';
      break;
    case 500:
      error.message = '服务器端出错';
      break;
    case 501:
      error.message = '网络未实现';
      break;
    case 502:
      error.message = '网络错误';
      break;
    case 503:
      error.message = '服务不可用';
      break;
    case 504:
      error.message = '网络超时';
      break;
    case 505:
      error.message = 'http版本不支持该请求';
      break;
    default:
      error.message = `连接错误${status}`;
  }
};

// * 创建axios实例
var instance = axios.create({
  timeout: 1000 * 10 // * 设置请求超时时间
});
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */

instance.interceptors.request.use(
  config => {
    config.headers.token = sessionStorage.getItem('token');
    return config
  },
  error => Promise.reject(error)
);

// * 响应拦截器
instance.interceptors.response.use(
  res => res.data,
  error => {
    // * 请求已发出，但是不在2xx的范围
    if (error && error.response) {
      const { response } = error;
      errorHandle(response.status, error);
      return Promise.reject(response);
    }
    // * 处理断网的情况
    // * eg:请求超时或断网时，更新state的network状态
    // * network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // * 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    // * store.commit('changeNetwork', false);
    // error.message = "连接到服务器失败"
  }
);
export default instance;
