import React, { useState } from 'react';
import { Box, Flex, Text } from '@/components';
import { Toast, NavBar } from 'antd-mobile';
import { UnorderedListOutline, UserOutline } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import { useHomeContext } from '@/hooks/useHomeContex';
import 'swiper/css/pagination';

const Home = () => {
  const navigate = useNavigate();
  const { homeInfo } = useHomeContext();
  const { carousels, hotGoodses, newGoodses, recommendGoodses } = homeInfo;

  return (
    <div className='home' style={{ background: '#f9f9f9', paddingBottom: '0.55rem' }}>
      <Box w='100%' pos='fixed' zIndex={99}>
        <NavBar
          back={
            <Box onClick={() => navigate('/shop')}>
              <UnorderedListOutline fontSize={'0.24rem'} />
            </Box>
          }
          right={
            <Flex onClick={() => navigate('/about')} justify={'flex-end'}>
              <UserOutline fontSize={'0.24rem'} />
            </Flex>
          }
          backArrow={false}
        >
          <Box w='100%'>
            <Flex bg='rgba(255, 255, 255, 0.7)' align={'center'} justify={'center'} br='0.08rem'>
              <Text fw='bold' c='#ae1b1bcc'>
                良品铺子
              </Text>
              <Box borderLeft={'1px solid #424242'} h='0.16rem' m='0 0.1rem'></Box>
              <Text c='#666' fz='0.14rem'>
                期待每一次的相遇
              </Text>
            </Flex>
          </Box>
        </NavBar>
      </Box>
      <Box w='100%'>
        <Swiper
          slidesPerView={1}
          className='home_banner'
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          speed={300}
          loop={true}
          centeredSlides={true}
          spaceBetween={15}
        >
          {carousels &&
            carousels.map((item: any) => {
              return (
                <SwiperSlide key={item.carouselUrl}>
                  <a href={item.redirectUrl}>
                    <Box>
                      <img src={item.carouselUrl} />
                    </Box>
                  </a>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Box>
      <Box w='100%'>
        <Box w='100%' p='0.2rem 0' ta='center'>
          <Text fw='bold' c='#ae1b1bcc' fz='0.16rem'>
            热门商品
          </Text>
        </Box>
        <Flex flexWrap={'wrap'}>
          {hotGoodses &&
            hotGoodses.map((item: any) => {
              return (
                <Box
                  key={item.goodsId}
                  bg='#fff'
                  w='1.8rem'
                  m='0.0375rem'
                  onClick={() => navigate({ pathname: '/goodsDetail', search: `goodsId=${item.goodsId}` })}
                >
                  <Box>
                    <img src={'http://backend-api-01.newbee.ltd' + item.goodsCoverImg} />
                  </Box>
                  <Box ta='center' w='100%'>
                    <Text>{item.goodsIntro}</Text>
                    <br />
                    <Text c='#ae1b1bcc'>价格：{item.sellingPrice}</Text>
                  </Box>
                </Box>
              );
            })}
        </Flex>
      </Box>
      <Box w='100%'>
        <Box w='100%' p='0.2rem 0' ta='center'>
          <Text fw='bold' c='#ae1b1bcc' fz='0.16rem'>
            最新上线
          </Text>
        </Box>
        <Flex flexWrap={'wrap'}>
          {newGoodses &&
            newGoodses.map((item: any) => {
              return (
                <Box
                  key={item.goodsId}
                  bg='#fff'
                  w='1.8rem'
                  m='0.0375rem'
                  onClick={() => navigate({ pathname: '/goodsDetail', search: `goodsId=${item.goodsId}` })}
                >
                  <Box>
                    <img src={'http://backend-api-01.newbee.ltd' + item.goodsCoverImg} />
                  </Box>
                  <Box ta='center' w='100%'>
                    <Text>{item.goodsIntro}</Text>
                    <br />
                    <Text c='#ae1b1bcc'>价格：{item.sellingPrice}</Text>
                  </Box>
                </Box>
              );
            })}
        </Flex>
      </Box>
      <Box w='100%'>
        <Box w='100%' p='0.2rem 0' ta='center'>
          <Text fw='bold' c='#ae1b1bcc' fz='0.16rem'>
            推荐商品
          </Text>
        </Box>
        <Flex flexWrap={'wrap'}>
          {recommendGoodses &&
            recommendGoodses.map((item: any) => {
              return (
                <Box
                  key={item.goodsId}
                  bg='#fff'
                  w='1.8rem'
                  m='0.0375rem'
                  onClick={() => navigate({ pathname: '/goodsDetail', search: `goodsId=${item.goodsId}` })}
                >
                  <Box>
                    <img src={'http://backend-api-01.newbee.ltd' + item.goodsCoverImg} />
                  </Box>
                  <Box ta='center' w='100%'>
                    <Text>{item.goodsIntro}</Text>
                    <br />
                    <Text c='#ae1b1bcc'>价格：{item.sellingPrice}</Text>
                  </Box>
                </Box>
              );
            })}
        </Flex>
      </Box>
    </div>
  );
};

export default Home;
