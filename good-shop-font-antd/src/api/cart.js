import axios, { getAxios, postAxios } from '@/utils/axios';

export function addCart(params) {
  return postAxios('/shop-cart', params);
}

export function getCart(params) {
  return getAxios('/shop-cart', { params });
}
