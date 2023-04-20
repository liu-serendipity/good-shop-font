import React, { useState, useMemo } from 'react';
import { getGoodsDetail, getCategory, search } from '@/api/goods';

export const GoodsContext = React.createContext();
export const GoodsProvider = ({ children }) => {
  const [goodsDetail, setGoodsDetail] = useState({});
  const [category, setCategory] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchData, setSearchData] = useState({});

  const fetchGoodsDetail = async (id) => {
    await getGoodsDetail(id).then((res) => {
      setGoodsDetail(res);
    });
  };

  const fetchCategory = async () => {
    await getCategory().then((res) => {
      setCategory(res);
    });
  };

  const fetchSearch = async (params = {}) => {
    await search(params).then((res) => {
      setSearchList([...searchList, ...res.list]);
      setSearchData(res);

      return Promise.resolve();
    });
  };

  const value = useMemo(() => {
    return {
      goodsDetail,
      category,
      searchList,
      searchData,
      fetchGoodsDetail,
      fetchCategory,
      fetchSearch,
    };
  }, [goodsDetail, category, searchList, searchData, fetchSearch, fetchCategory, fetchGoodsDetail]);

  return <GoodsContext.Provider value={value}>{children}</GoodsContext.Provider>;
};
