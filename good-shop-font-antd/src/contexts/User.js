import React, { useState, useEffect, useMemo } from 'react';
import { getUserInfo, editUserInfo, logout } from '@/api';

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
      if (res.resultCode === 200) {
        getUserInfo().then((data) => {
          setUserInfo(data);
          return Promise.resolve({ ...res, data });
        });
      }
    });
  };

  const fetchLogout = async () => {
    await logout().then((res) => {
      return Promise.resolve(res);
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
      fetchLogout,
    };
  }, [userInfo, fetchUserInfo, fetchEditUserInfo, fetchLogout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
