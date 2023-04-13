import { useContext } from 'react';
import { GoodsContext } from '@/contexts/Goods';
export const useGoodsContext = () => useContext(GoodsContext);
