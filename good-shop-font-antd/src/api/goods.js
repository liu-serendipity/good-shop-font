import axios, { getAxios, postAxios } from '@/utils/axios';

export function getGoodsDetail(id) {
  return getAxios(`/goods/detail/${id}`);
}
