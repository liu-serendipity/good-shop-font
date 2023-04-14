import React, { useState, useEffect } from 'react';
import { NavBar, Button, List, Popup, Toast } from 'antd-mobile';
import { Box, Flex, Text, Center } from '@/components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCartContext } from '@/hooks/useCartContex';
import { useAddressContext } from '@/hooks/useAddressContex';
import { useOrderContext } from '@/hooks/useOrderContext';
import { sleep } from '@/utils';

const Pay = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const cartItemIds = search.get('payItems' || '') || '[]';
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const { fetchCartItemsByIds, payList } = useCartContext();
  const { fetchDefaultAddress, defaultAddress } = useAddressContext();
  const { fetchCreateOrder, fetchPayOrder, orderNo } = useOrderContext();
  const [ids, setIds] = useState(
    cartItemIds ? JSON.parse(cartItemIds) : JSON.parse(localStorage.getItem('cartItemIds') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('cartItemIds', JSON.stringify(ids));
    fetchCartItemsByIds({ cartItemIds: ids });
    fetchDefaultAddress();
  }, [cartItemIds]);

  useEffect(() => {
    onComputed();
  }, [payList]);

  const onCreate = () => {
    const params = {
      addressId: defaultAddress.addressId,
      cartItemIds: ids,
    };

    fetchCreateOrder(params);
    setVisible(true);
    window.localStorage.setItem('cartItemIds', '');
  };

  const onPay = async (type: number) => {
    const params = { orderNo: orderNo, payType: type };

    fetchPayOrder(params);
    Toast.show('支付成功！');
    setVisible(false);
    await sleep(600);
    navigate('/order');
  };

  const onComputed = () => {
    let sum = 0;
    payList.forEach((item: any) => {
      sum += item.goodsCount * item.sellingPrice;
    });
    setTotal(sum);
  };

  return (
    <div className='pay'>
      <Box pos={'fixed'} w='100%' bg='#fff' borderBottom={'1px solid #ebedf0'}>
        <NavBar onBack={() => navigate(-1)}>生成订单</NavBar>
      </Box>
      <Box pt='0.45rem' pb='0.6rem' w='100%'>
        <List header='确认收货人信息：'>
          <List.Item
            description={`${defaultAddress.provinceName} ${defaultAddress.cityName} ${defaultAddress.regionName} ${defaultAddress.detailAddress}`}
            clickable
            onClick={() => navigate('/address')}
          >
            {defaultAddress.userName} {defaultAddress.userPhone}
          </List.Item>
        </List>
        <List header='购买商品列表：'>
          {payList.map((item: any) => {
            return (
              <List.Item
                key={item.cartItemId}
                clickable={false}
                extra={<Box>x{item.goodsCount}</Box>}
                prefix={
                  <Center w='0.6rem'>
                    <img src={'http://backend-api-01.newbee.ltd' + item.goodsCoverImg} />
                  </Center>
                }
                description={<Box c='red'>¥ {item.sellingPrice}</Box>}
              >
                <Text fz='0.14rem'>{item.goodsName}</Text>
              </List.Item>
            );
          })}
        </List>
      </Box>
      <Flex
        w='100%'
        pos='fixed'
        bg='#fff'
        borderTop={'1px solid #ebedf0'}
        b='0'
        justify={'space-between'}
        align={'center'}
        p='0.06rem 0'
      >
        <Box p='0 0.16rem'>
          <Text>商品金额合计：</Text>
          <Text c='red' fz='0.16rem'>
            ¥ {total}
          </Text>
        </Box>
        <Box p='0 0.16rem'>
          <Button color='primary' onClick={() => onCreate()}>
            生成订单
          </Button>
        </Box>
      </Flex>
      <Popup visible={visible} onMaskClick={() => setVisible(false)} bodyStyle={{ height: '30vh' }}>
        <Box w='70%' m='auto'>
          <Box w='100%' pt='0.4rem'>
            <Button block color='success' onClick={() => onPay(1)}>
              微信支付
            </Button>
          </Box>
          <Box w='100%' pt='0.3rem'>
            <Button block color='primary' onClick={() => onPay(2)}>
              支付宝支付
            </Button>
          </Box>
        </Box>
      </Popup>
    </div>
  );
};

export default Pay;
