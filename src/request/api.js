/**
 * @file api统一管理
 * @author SillyBorz <wcnb233@163.com>
 * @version 1.0
 */

import axios from "./http.js";
export default {
  signin(params) {
    return axios.get(`/api/user/${params}`);
  },
  signup(params) {
    return axios.post("/api/user", params);
  }
};
