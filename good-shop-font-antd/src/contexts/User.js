import React, { useState, useEffect, useMemo } from 'react';
import { getUserInfo } from '@/api';

export const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const fetchUserInfo = async () => {
    await getUserInfo().then((res) => {
      setUserInfo(res);
    });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const value = useMemo(() => {
    return {
      userInfo,
      fetchUserInfo,
    };
  }, [userInfo]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
