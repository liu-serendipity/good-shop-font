import React, { useState, useMemo } from 'react';
import { addCart, getCart, deleteCartItem, modifyCart, getByCartItemIds } from '@/api/cart';

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

  const fetchDeteleCartItem = async (id) => {
    await deleteCartItem(id).then(() => {
      fetchCart();
    });
  };

  const fetchModifyCart = async (params = {}) => {
    await modifyCart(params).then((res) => {
      console.log(res, 'mmmm');
    });
  };

  const fetchCartItemsByIds = async (params = {}) => {
    await getByCartItemIds(params).then((res) => {
      console.log(res, 'ididididid');
    });
  };

  const value = useMemo(() => {
    return {
      cartList,
      fetchAddCart,
      fetchCart,
      fetchDeteleCartItem,
      fetchModifyCart,
      fetchCartItemsByIds,
    };
  }, [cartList, fetchAddCart, fetchCart, fetchDeteleCartItem, fetchModifyCart, fetchCartItemsByIds]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
