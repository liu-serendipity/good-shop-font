import React, { useState, useEffect } from 'react';
import { NavBar } from 'antd-mobile';
import { Box, Center } from '@/components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCartContext } from '@/hooks/useCartContex';

const Pay = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const getCartItemIds = search.get('payItems' || '') || '[]';
  const { fetchCartItemsByIds } = useCartContext();

  const cartItemIds = getCartItemIds
    ? JSON.parse(getCartItemIds)
    : JSON.parse(localStorage.getItem('cartItemIds') || '[]');
  localStorage.setItem('cartItemIds', JSON.stringify(cartItemIds));

  console.log(cartItemIds, 'cartItemIds');

  useEffect(() => {
    const params = { cartItemIds: cartItemIds };
    fetchCartItemsByIds(params);
  }, [getCartItemIds]);

  return <div className='pay'></div>;
};

export default Pay;
