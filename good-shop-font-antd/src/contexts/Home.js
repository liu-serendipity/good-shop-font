import React, { useState, useEffect, useMemo } from 'react';
import { getHome } from '@/api/home';

export const HomeContext = React.createContext();
export const HomeProvider = ({ children }) => {
  const [homeInfo, setHomeInfo] = useState({});

  const fetchHomeInfo = async () => {
    await getHome().then((res) => {
      setHomeInfo(res);
    });
  };

  useEffect(() => {
    fetchHomeInfo();
  }, []);

  const value = useMemo(() => {
    return {
      homeInfo,
      fetchHomeInfo,
    };
  }, [homeInfo, fetchHomeInfo]);

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
