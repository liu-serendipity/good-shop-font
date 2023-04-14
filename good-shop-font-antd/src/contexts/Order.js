import React, { useState, useMemo } from 'react';
import { createOrder, payOrder, getOrderList, getOrderDetail, cancelOrder, confirmOrder } from '@/api/order';

export const OrderContext = React.createContext();
export const OrderProvider = ({ children }) => {
  const [orderNo, setOrderNo] = useState('');
  const [allOrder, setAllOrder] = useState({});
  const [orderDetail, setOrderDetail] = useState({});

  const fetchCreateOrder = async (params) => {
    await createOrder(params).then((res) => {
      setOrderNo(res);
    });
  };

  const fetchPayOrder = async (params) => {
    await payOrder(params);
  };

  const fetchAllOrder = async (params) => {
    await getOrderList(params).then((res) => {
      setAllOrder(res);
    });
  };

  const fetchOrderDetail = async (params) => {
    await getOrderDetail(params).then((res) => {
      setOrderDetail(res);
    });
  };

  const fetchCancelOrder = async (id) => {
    await cancelOrder(id);
  };

  const fetchConfirmOrder = async (id) => {
    await confirmOrder(id);
  };

  const value = useMemo(() => {
    return {
      orderNo,
      allOrder,
      orderDetail,
      fetchAllOrder,
      fetchCreateOrder,
      fetchPayOrder,
      fetchOrderDetail,
      fetchCancelOrder,
      fetchConfirmOrder,
    };
  }, [
    orderNo,
    allOrder,
    orderDetail,
    fetchConfirmOrder,
    fetchCancelOrder,
    fetchCreateOrder,
    fetchPayOrder,
    fetchAllOrder,
    fetchOrderDetail,
  ]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
