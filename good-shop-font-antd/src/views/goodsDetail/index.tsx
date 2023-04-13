import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGoodsContext } from '@/hooks/useGoodsContext';
import { NavBar, Toast } from 'antd-mobile';
import { Box, Text, Flex, Center } from '@/components';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import { ShopbagOutline, KoubeiOutline } from 'antd-mobile-icons';
import { useCartContext } from '@/hooks/useCartContex';
import { sleep } from '@/utils';

const GoodsDetail = () => {
  const [search] = useSearchParams();
  const goodsId = search.get('goodsId' || '');
  const { fetchGoodsDetail, goodsDetail } = useGoodsContext();
  const { fetchAddCart, cartList, fetchCart } = useCartContext();
  const navigate = useNavigate();
  const [swiperIndex, setSwiperIndex] = useState(0);

  useEffect(() => {
    fetchCart();
    fetchGoodsDetail(goodsId);
  }, []);

  const contentElement = document.getElementById('content');
  if (contentElement) {
    contentElement.innerHTML = goodsDetail.goodsDetailContent || `<div></div>`;
  }

  const handleAddCart = () => {
    fetchAddCart({ goodsCount: 1, goodsId: goodsId });
    fetchCart();
    Toast.show('添加成功！');
  };

  const jumpAddToCart = async () => {
    fetchAddCart({ goodsCount: 1, goodsId: goodsId });
    fetchCart();
    await sleep(800);
    navigate({ pathname: '/cart' });
  };

  return (
    <div className='goodsDetail'>
      <Box w='100%' pos='fixed' bg='#fff' borderBottom={'1px solid #ebedf0'} zIndex={9}>
        <NavBar onBack={() => navigate(-1)}>商品详情页</NavBar>
      </Box>
      <Box pt='0.45rem' w='100%' pb='0.54rem'>
        <Swiper
          slidesPerView={1}
          className='goods_detail_swiper'
          centeredSlides={true}
          spaceBetween={0}
          onSlideChange={(s: any) => {
            setSwiperIndex(s.realIndex);
          }}
        >
          {goodsDetail.goodsCarouselList?.map((item: any) => {
            return (
              <SwiperSlide key={item}>
                <Box w='100%'>
                  <img src={'http://backend-api-01.newbee.ltd' + item} />
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Box p='0rem 0.3rem'>
          <Box>
            <Text c='#f63515' fw='bold' fz='0.2rem'>
              ¥{goodsDetail.sellingPrice}
            </Text>
          </Box>
          <Box p='0.08rem 0'>
            <Text fw='bold'>{goodsDetail.goodsName}</Text>
          </Box>
          <Box>
            <Text>商品介绍：{goodsDetail.goodsIntro}</Text>
          </Box>
          <Box p='0.06rem 0'>
            <Text c='#999' fz='0.12rem'>
              免邮费，顺丰快递
            </Text>
          </Box>
        </Box>
        <Flex w='100%' justify={'center'} p='0.3rem 0 0.1rem 0'>
          <Text fz='0.16rem'>
            概述 &nbsp;&nbsp;| &nbsp;&nbsp;参数 &nbsp;&nbsp;| &nbsp;&nbsp;安装服务 &nbsp;&nbsp;| &nbsp;&nbsp;常见问题
          </Text>
        </Flex>
        <Flex w='100%' justify={'center'}>
          <div id='content'></div>
        </Flex>
      </Box>
      <Flex w='100%' pos='fixed' b='0' bg='#fff' borderTop={'1px solid #ebedf0'} justify='space-between' align='center'>
        <Flex align='center'>
          <Flex
            flexDir={'column'}
            align='center'
            w='fit-content'
            p='0.06rem 0.14rem'
            onClick={() => {
              Toast.show('待开发...');
            }}
          >
            <KoubeiOutline fontSize={'0.2rem'} />
            <Text>客服</Text>
          </Flex>
          <Flex
            flexDir={'column'}
            align='center'
            w='fit-content'
            p='0.06rem 0.14rem'
            onClick={() => navigate('/cart')}
            pos='relative'
          >
            <ShopbagOutline fontSize={'0.2rem'} />
            <Center bg='red' br='50%' pos='absolute' w='0.12rem' h='0.12rem' r='0.2rem'>
              <Text fz='0.1rem' c='#fff'>
                {cartList?.length}
              </Text>
            </Center>
            <Text>购物车</Text>
          </Flex>
        </Flex>
        <Flex p='0.06rem'>
          <Box
            bg='linear-gradient(to right, #d91f1f8f, #ec1010fa)'
            w='1rem'
            ta='center'
            p='0.08rem 0'
            borderBottomLeftRadius={'0.16rem'}
            borderTopLeftRadius={'0.16rem'}
            onClick={() => handleAddCart()}
            c='#fff'
          >
            加入购物车
          </Box>
          <Box
            bg='linear-gradient(to right, #d91f1f8f, #ec1010fa)'
            w='1rem'
            ta='center'
            p='0.08rem 0'
            borderBottomRightRadius={'0.16rem'}
            borderTopRightRadius={'0.16rem'}
            c='#fff'
            onClick={() => jumpAddToCart()}
          >
            立即购买
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export default GoodsDetail;
