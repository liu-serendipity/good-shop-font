import axios, { getAxios, postAxios } from '@/utils/axios';

export function addCart(params) {
  return postAxios('/shop-cart', params);
}

export function getCart(params) {
  return getAxios('/shop-cart', { params });
}

export function deleteCartItem(id) {
  return axios.delete(`/shop-cart/${id}`);
}

export function modifyCart(params) {
  return axios.put('/shop-cart', params);
}

export function getByCartItemIds(params) {
  return getAxios('/shop-cart/settle', { params });
}
