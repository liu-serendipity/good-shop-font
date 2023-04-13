import React, { useState, useMemo } from 'react';
import {
  getAddressList,
  editAddress,
  getAddressDetail,
  addAddress,
  deleteAddress,
  getDefaultAddress,
} from '@/api/address';

export const AddressContext = React.createContext();
export const AddressProvider = ({ children }) => {
  const [addressList, setAddressList] = useState([]);
  const [addressDetail, setAddressDetail] = useState({});

  const fetchUserAddress = async () => {
    const params = { pageNumber: 1, pageSize: 1000 };
    await getAddressList(params).then((res) => {
      setAddressList(res);
    });
  };

  const fetchEditUserAddress = async (params = {}) => {
    await editAddress(params);
  };

  const fetchUserAddressDetail = async (id) => {
    await getAddressDetail(id).then((res) => {
      setAddressDetail(res);
    });
  };

  const fetchAddAddress = async (params = {}) => {
    await addAddress(params);
  };

  const fetchDeleteAddress = async (id) => {
    await deleteAddress(id);
  };

  const fetchDefaultAddress = async () => {
    await getDefaultAddress();
  };

  const value = useMemo(() => {
    return {
      addressList,
      addressDetail,
      fetchUserAddress,
      fetchEditUserAddress,
      fetchUserAddressDetail,
      fetchAddAddress,
      fetchDeleteAddress,
      fetchDefaultAddress,
    };
  }, [
    addressList,
    addressDetail,
    fetchUserAddress,
    fetchEditUserAddress,
    fetchUserAddressDetail,
    fetchAddAddress,
    fetchDeleteAddress,
    fetchDefaultAddress,
  ]);

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>;
};
