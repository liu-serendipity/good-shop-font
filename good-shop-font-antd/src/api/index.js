import axios, { getAxios, postAxios } from '@/utils/axios';

// 登陆
export function login(params) {
  return postAxios('/user/login', params);
}

// 注册
export function register(params) {
  return postAxios('/user/register', params);
}

// 获取用户信息
export function getUserInfo() {
  return getAxios('/user/info');
}

// 编辑用户信息
export function editUserInfo(params) {
  return axios.put('/user/info', params);
}

// 退出登陆
export function logout() {
  return postAxios('/user/logout');
}
