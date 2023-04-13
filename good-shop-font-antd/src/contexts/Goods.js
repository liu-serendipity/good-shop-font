import React, { useState, useMemo } from 'react';
import { getGoodsDetail } from '@/api/goods';

export const GoodsContext = React.createContext();
export const GoodsProvider = ({ children }) => {
  const [goodsDetail, setGoodsDetail] = useState({});

  const fetchGoodsDetail = async (id) => {
    await getGoodsDetail(id).then((res) => {
      setGoodsDetail(res);
    });
  };
  const value = useMemo(() => {
    return {
      goodsDetail,
      fetchGoodsDetail,
    };
  }, [goodsDetail, fetchGoodsDetail]);

  return <GoodsContext.Provider value={value}>{children}</GoodsContext.Provider>;
};
