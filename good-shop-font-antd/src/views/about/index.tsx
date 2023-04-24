import React from 'react';
import { NavBar, Avatar, List, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { sleep } from '@/utils';
import {
  MoreOutline,
  ShopbagOutline,
  UserContactOutline,
  LocationOutline,
  ExclamationCircleOutline,
} from 'antd-mobile-icons';
import { Box, Text, Flex, Center } from '@/components';
import { useUserContext } from '@/hooks/useUserContext';

import main from './imgs/main.jpg';
import userAv from './imgs/userAv.jpeg';

const About = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserContext();

  const jump = async (val: string) => {
    Toast.show('加载中');
    await sleep(800);
    navigate(val);
  };

  return (
    <div className='about'>
      <Box pos={'fixed'} w='100%'>
        <NavBar onBack={() => navigate(-1)} right={<MoreOutline fontSize={'0.24rem'} />}>
          个人主页
        </NavBar>
      </Box>
      <Box pt='0.45rem' w='100%'>
        <Flex
          bg='linear-gradient(90deg, #e6450f91, #ec0b0bcf)'
          boxShadow='0 0.05333rem 0.13333rem #ed0a0a9c'
          br='0.16rem'
          p='0.2rem'
          w='3rem'
          m='auto'
          mt='0.1rem'
          mb='0.1rem'
          align='center'
        >
          <Avatar src={userAv} style={{ '--size': '0.64rem' }} />
          <Box p='0.1rem'>
            <Text>昵称：{userInfo?.nickName}</Text>
            <br />
            <Text>登陆名：{userInfo?.loginName}</Text>
            <br />
            <Text>个性签名：{userInfo?.introduceSign}</Text>
          </Box>
        </Flex>
      </Box>
      <Box w='100%' mt='0.4rem'>
        <List>
          <List.Item prefix={<ShopbagOutline />} onClick={() => jump('/order')}>
            我的订单
          </List.Item>
          <List.Item prefix={<UserContactOutline />} onClick={() => jump('/setting')}>
            账号管理
          </List.Item>
          <List.Item prefix={<LocationOutline />} onClick={() => jump('/address')}>
            地址管理
          </List.Item>
          <List.Item prefix={<ExclamationCircleOutline />} onClick={() => jump('/us')}>
            关于我们
          </List.Item>
        </List>
      </Box>
      <Center mt='0.2rem'>
        <Box w='3.4rem'>
          <img src={main} />
        </Box>
      </Center>
    </div>
  );
};

export default About;
