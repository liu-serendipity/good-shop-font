import { getAxios } from '@/utils/axios';

export function getGoodsDetail(id) {
  return getAxios(`/goods/detail/${id}`);
}

export function getCategory() {
  return getAxios('/categories');
}

export function search(params) {
  return getAxios('/search', params);
}
