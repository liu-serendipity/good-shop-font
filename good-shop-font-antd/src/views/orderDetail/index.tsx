import React, { useEffect, useState } from 'react';
import { NavBar, List, Button, Toast, Popup } from 'antd-mobile';
import { Box, Text, Center } from '@/components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useOrderContext } from '@/hooks/useOrderContext';

const OrderDetail = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const orderId = search.get('orderId' || '');
  const [visible, setVisible] = useState(false);
  const { fetchOrderDetail, orderDetail, fetchCancelOrder, fetchConfirmOrder, fetchPayOrder } = useOrderContext();

  useEffect(() => {
    orderId && fetchOrderDetail(orderId);
  }, [orderId]);

  console.log(orderDetail, '-----');

  const handleCancelOrder = (id: number) => {
    fetchCancelOrder(id);
    Toast.show('成功取消！');
  };

  const handleConfirmOrder = (id: number) => {
    fetchConfirmOrder(id);
    Toast.show('成功确认！');
  };

  const onPay = async (type: number) => {
    const params = { orderNo: orderDetail.orderNo, payType: type };

    fetchPayOrder(params);
    Toast.show('支付成功！');
    setVisible(false);
  };

  return (
    <div className='orderDetail' style={{ background: '#f7f7f7' }}>
      <Box w='100%' pos='fixed' bg='#fff' zIndex={9} borderBottom={'1px solid #ebedf0'}>
        <NavBar onBack={() => navigate(-1)}>订单详情</NavBar>
      </Box>
      <Box pt='0.45rem' w='100%' pb='0.4rem'>
        <Box w='100%'>
          <List mode='card'>
            <List.Item>
              <Box>
                <Text c='#999' fz='0.14rem'>
                  订单状态：
                </Text>
                <Text fz='0.16rem'>{orderDetail.orderStatusString || ''}</Text>
              </Box>
            </List.Item>
            <List.Item>
              <Box>
                <Text c='#999' fz='0.14rem'>
                  订单编号：
                </Text>
                <Text fz='0.16rem'>{orderDetail.orderNo || ''}</Text>
              </Box>
            </List.Item>
            <List.Item>
              <Box>
                <Text c='#999' fz='0.14rem'>
                  下单时间：
                </Text>
                <Text fz='0.16rem'>{orderDetail.createTime || ''}</Text>
              </Box>
            </List.Item>
            {orderDetail.orderStatus === 3 && (
              <List.Item>
                <Button block color='success' onClick={() => handleConfirmOrder(orderDetail.orderNo)}>
                  确认收货
                </Button>
              </List.Item>
            )}
            {orderDetail.orderStatus === 0 && (
              <List.Item>
                <Button block color='primary' onClick={() => setVisible(true)}>
                  去支付
                </Button>
              </List.Item>
            )}
            {!(orderDetail.orderStatus < 0 || orderDetail.orderStatus === 4) && (
              <List.Item>
                <Button block color='danger' onClick={() => handleCancelOrder(orderDetail.orderNo)}>
                  取消订单
                </Button>
              </List.Item>
            )}
          </List>
          <List mode='card'>
            <List.Item>
              <Box>
                <Text c='#999' fz='0.14rem'>
                  商品金额：
                </Text>
                <Text fz='0.16rem'>¥ {orderDetail.totalPrice || ''}</Text>
              </Box>
            </List.Item>
            <List.Item>
              <Box>
                <Text c='#999' fz='0.14rem'>
                  配送方式：
                </Text>
                <Text fz='0.16rem'>普通快递</Text>
              </Box>
            </List.Item>
          </List>
          <List mode='card'>
            {orderDetail.newBeeMallOrderItemVOS?.map((item: any) => {
              return (
                <List.Item
                  style={{ padding: '0' }}
                  key={item.orderNo}
                  prefix={
                    <Center w='0.9rem' p='0.1rem'>
                      <img src={'http://backend-api-01.newbee.ltd' + item.goodsCoverImg} />
                    </Center>
                  }
                  extra={`x${item.goodsCount}`}
                  description={
                    <Box>
                      <Text c='#969799' fz='0.1rem'>
                        全场包邮
                      </Text>
                      <Box pt='0.04rem'>
                        <Text c='red'>¥ {item.sellingPrice}</Text>
                      </Box>
                    </Box>
                  }
                >
                  <Text fz='0.12rem'>{item.goodsName}</Text>
                </List.Item>
              );
            })}
          </List>
        </Box>
      </Box>
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

export default OrderDetail;
