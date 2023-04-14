import axios, { getAxios, postAxios } from '@/utils/axios';

export function createOrder(params = {}) {
  return postAxios('/saveOrder', params);
}

export function payOrder(params) {
  return axios.get('/paySuccess', { params });
}

export function getOrderList(params) {
  return getAxios('/order', { params });
}

export function getOrderDetail(id) {
  return getAxios(`/order/${id}`);
}

export function cancelOrder(id) {
  return axios.put(`/order/${id}/cancel`);
}

export function confirmOrder(id) {
  return axios.put(`/order/${id}/finish`);
}
