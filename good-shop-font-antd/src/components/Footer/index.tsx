import React from 'react';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { NavLink } from 'react-router-dom';
import { IconIndex, IconMall, IconCart, IconAbout } from '@/assets/icon';

export const Footer = () => {
  return (
    <Flex bg='#fff' pos={'fixed'} w='100%' zIndex={109} b='0' justify={'space-around'}>
      <NavLink to='/home'>
        {({ isActive }) => (
          <Flex w='0.6rem' flexDir={'column'} align={'center'} p='0.04rem 0.1rem'>
            <IconIndex w='0.28rem' h='0.28rem' fill={isActive ? '#d81e06' : ''} />
            <Text c={isActive ? '#d81e06' : '#424242'}>首页</Text>
          </Flex>
        )}
      </NavLink>
      <NavLink to='/shop'>
        {({ isActive }) => (
          <Flex w='0.6rem' flexDir={'column'} align={'center'} p='0.04rem 0.1rem'>
            <IconMall w='0.28rem' h='0.28rem' fill={isActive ? '#d81e06' : ''} />
            <Text c={isActive ? '#d81e06' : '#424242'}>商城</Text>
          </Flex>
        )}
      </NavLink>
      <NavLink to='/cart'>
        {({ isActive }) => (
          <Flex w='0.6rem' flexDir={'column'} align={'center'} p='0.04rem 0.1rem'>
            <IconCart w='0.28rem' h='0.28rem' fill={isActive ? '#d81e06' : ''} />
            <Text c={isActive ? '#d81e06' : '#424242'}>购物车</Text>
          </Flex>
        )}
      </NavLink>
      <NavLink to='/about'>
        {({ isActive }) => (
          <Flex w='0.6rem' flexDir={'column'} align={'center'} p='0.04rem 0.1rem'>
            <IconAbout w='0.28rem' h='0.28rem' fill={isActive ? '#d81e06' : ''} />
            <Text c={isActive ? '#d81e06' : '#424242'}>关于</Text>
          </Flex>
        )}
      </NavLink>
    </Flex>
  );
};
