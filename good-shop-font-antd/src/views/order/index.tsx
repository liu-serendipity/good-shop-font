import React, { useEffect } from 'react';
import { useOrderContext } from '@/hooks/useOrderContext';
import { NavBar, Tabs, List } from 'antd-mobile';
import { Box, Center, Text, Flex } from '@/components';
import { useNavigate } from 'react-router-dom';

const tabs = [
  {
    key: 'all',
    value: '全部',
    label: '',
  },
  {
    key: 'toPay',
    value: '待付款',
    label: '0',
  },
  {
    key: 'toConfirm',
    value: '待确认',
    label: '1',
  },
  {
    key: 'toSend',
    value: '待发货',
    label: '2',
  },
  {
    key: 'haveSend',
    value: '已发货',
    label: '3',
  },
  {
    key: 'completed',
    value: '交易完成',
    label: '4',
  },
];

const Order = () => {
  const { allOrder, fetchAllOrder } = useOrderContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllOrder();
  }, []);

  const jumpToOrderDetail = (id: number) => {
    navigate({ pathname: '/order/detail', search: `orderId=${id}` });
  };

  return (
    <div className='order'>
      <Box pos='fixed' w='100%' bg='#fff' borderBottom={'1px solid #ebedf0'} zIndex={9}>
        <NavBar onBack={() => navigate('/about')}>我的订单</NavBar>
      </Box>
      <Box w='100%' pt='0.45rem'>
        <Tabs defaultActiveKey={'all'} style={{ '--title-font-size': '0.14rem' }}>
          {tabs.map((item) => {
            return (
              <Tabs.Tab key={item.key} title={item.value}>
                {allOrder.list &&
                  allOrder.list.map((order: any) => {
                    if (order.orderStatus == item.label || !item.label) {
                      return (
                        <List.Item
                          key={order.orderNo}
                          title={
                            <Flex justify={'space-between'}>
                              <Text>订单时间：{order.createTime}</Text>
                              <Text>{order.orderStatusString}</Text>
                            </Flex>
                          }
                          arrow={false}
                          onClick={() => jumpToOrderDetail(order.orderNo)}
                        >
                          <List>
                            {order.newBeeMallOrderItemVOS?.map((item2: any) => {
                              return (
                                <List.Item
                                  key={item2.goodsId}
                                  prefix={
                                    <Center w='1rem'>
                                      <img src={'http://backend-api-01.newbee.ltd' + item2.goodsCoverImg} />
                                    </Center>
                                  }
                                  extra={`x${item2.goodsCount}`}
                                  description={
                                    <Box>
                                      <Text c='#969799' fz='0.1rem'>
                                        全场包邮
                                      </Text>
                                      <Box pt='0.04rem'>
                                        <Text c='red'>¥ {item2.sellingPrice}</Text>
                                      </Box>
                                    </Box>
                                  }
                                >
                                  <Text fz='0.12rem'>{item2.goodsName}</Text>
                                </List.Item>
                              );
                            })}
                          </List>
                        </List.Item>
                      );
                    }
                  })}
              </Tabs.Tab>
            );
          })}
        </Tabs>
      </Box>
    </div>
  );
};

export default Order;
