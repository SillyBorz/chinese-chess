/**
 * @file api统一管理
 * @author SillyBorz <wcnb233@163.com>
 * @version 1.0
 */

import axios from './http.js';
export default {
  signin(params) {
    return axios.post('/api/user/signin', params);
  },
  signup(params) {
    return axios.post('/api/user/signup', params);
  },
  updataUserInfo(id, params) {
    return axios.put(`/api/user/${id}`, params);
  },
  checkUser(params) {
    return axios.post('/api/user/checkUser', params);
  }
};
