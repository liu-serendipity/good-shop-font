import React, { useState, useMemo } from 'react';
import { addCart, getCart } from '@/api/cart';

export const CartContext = React.createContext();
export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const fetchAddCart = async (params = {}) => {
    await addCart(params);
  };

  const fetchCart = async (params = {}) => [
    await getCart(params).then((res) => {
      setCartList(res);
    }),
  ];

  const value = useMemo(() => {
    return {
      cartList,
      fetchAddCart,
      fetchCart,
    };
  }, [cartList, fetchAddCart, fetchCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
