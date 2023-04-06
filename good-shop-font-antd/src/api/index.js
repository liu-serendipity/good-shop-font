import { getAxios, postAxios } from '@/utils/axios';

export function login(params) {
  return postAxios('/user/login', params);
}

export function register(params) {
  return postAxios('/user/register', params);
}
