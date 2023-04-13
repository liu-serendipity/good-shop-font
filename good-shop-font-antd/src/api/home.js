import axios, { getAxios, postAxios } from '@/utils/axios';

export function getHome() {
  return getAxios('/index-infos');
}
