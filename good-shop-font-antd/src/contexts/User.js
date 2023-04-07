import React, { useState, useEffect, useMemo } from 'react';
import { getUserInfo, editUserInfo } from '@/api';

export const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const fetchUserInfo = async () => {
    await getUserInfo().then((res) => {
      setUserInfo(res);
    });
  };

  const fetchEditUserInfo = async (params = {}) => {
    await editUserInfo(params).then((res) => {
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
      fetchEditUserInfo,
    };
  }, [userInfo]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
