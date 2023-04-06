import { getAxios, postAxios } from '@/utils/axios';

export function login(params) {
  return postAxios('/user/login', params);
}
