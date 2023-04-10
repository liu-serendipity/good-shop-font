import axios, { getAxios, postAxios } from '@/utils/axios';

// 地址列表
export function getAddressList(params = {}) {
  return getAxios('/address', params);
}

// 编辑地址
export function editAddress(params) {
  return axios.put('/address', params);
}

// 地址详情
export function getAddressDetail(id) {
  return getAxios(`/address/${id}`);
}

// 新增地址
export function addAddress(params) {
  return postAxios('/address', params);
}

// 删除地址
export function deleteAddress(id) {
  return axios.delete(`/address/${id}`);
}
