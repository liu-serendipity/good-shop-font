import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Center } from '@/components';
import { NavBar, CheckList, Radio, Button, Toast, Stepper } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/hooks/useCartContex';
import { CheckCircleFill, CheckCircleOutline } from 'antd-mobile-icons';
import { motion, useDragControls } from 'framer-motion';
import { sleep } from '@/utils';

const Cart = () => {
  const navigate = useNavigate();
  const controls = useDragControls();
  const { cartList, fetchCart, fetchDeteleCartItem, fetchModifyCart } = useCartContext(); // 购物车列表
  const [checkList, setCheckList] = useState<any>([]); // 勾选列表
  const [check, setCheck] = useState<boolean>(false); // 是否全选

  useEffect(() => {
    cartList.length === 0 && fetchCart();
  }, []);

  // 勾选变化
  const handleChange = (e: any) => {
    setCheckList(e);
  };

  //  监控是否全选
  useEffect(() => {
    if (check && checkList.length < cartList.length) {
      const list: any[] = [];
      cartList.map((item: any) => {
        list.push(item.cartItemId.toString());
      });
      setCheckList(list);
    } else if (!check && checkList.length == cartList.length) {
      setCheckList([]);
    }
  }, [check]);

  // 监视已勾选列表
  useEffect(() => {
    if (cartList.length > 0 && checkList.length == cartList.length) {
      setCheck(true);
    } else if (cartList.length > 0 && checkList.length < cartList.length) {
      setCheck(false);
    }
  }, [checkList]);

  // 提交
  const onSubmit = async () => {
    if (checkList.length == 0) return Toast.show('请选择至少一件商品！');
    const params = [...checkList] || [];
    await sleep(600);
    navigate({ pathname: '/pay', search: `payItems=${JSON.stringify(params)}` });
  };

  // 删除
  const onDetele = (id: number) => {
    fetchDeteleCartItem(id);
    Toast.show('删除成功！');
  };

  // 修改
  const handleModifyChange = (e: any, id: number) => {
    const params = { cartItemId: id, goodsCount: e };
    fetchModifyCart(params);
    Toast.show('修改成功！');
  };

  return (
    <div className='cart'>
      <Box pos='fixed' w='100%' bg='#fff' borderBottom={'1px solid #ebedf0'} zIndex={9}>
        <NavBar onBack={() => navigate(-1)}>购物车</NavBar>
      </Box>
      <Box pt='0.45rem' pb='1.18rem' w='100%'>
        {cartList.length > 0 ? (
          <CheckList
            extra={(active) => (active ? <CheckCircleFill /> : <CheckCircleOutline />)}
            multiple={true}
            onChange={handleChange}
            value={checkList}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {cartList.map((item: any) => {
              return (
                <Box key={item.cartItemId} w='100%' pos={'relative'}>
                  <Center
                    pos={'absolute'}
                    w='0.84rem'
                    h='100%'
                    bg='red'
                    c='#fff'
                    onClick={() => onDetele(item.cartItemId)}
                  >
                    删<br />除
                  </Center>
                  <motion.div drag='x' dragControls={controls} dragConstraints={{ left: 0, right: 84 }}>
                    <Box pos='relative' w='100%'>
                      <CheckList.Item value={`${item.cartItemId}`}>
                        <Flex align={'center'}>
                          <Box w='0.8rem'>
                            <img src={'http://backend-api-01.newbee.ltd' + item.goodsCoverImg} />
                          </Box>
                          <Box w='2rem' pl='0.2rem'>
                            <Text fz='0.12rem'>{item.goodsName}</Text>
                            <br />
                            <Box pt='0.04rem'>
                              <Text c='red' fz='0.14rem'>
                                ¥{item.sellingPrice}
                              </Text>
                            </Box>
                          </Box>
                        </Flex>
                      </CheckList.Item>
                      <Box pos='absolute' b='0.2rem' r='0.8rem'>
                        <Stepper
                          min={1}
                          max={5}
                          inputReadOnly={true}
                          defaultValue={item.goodsCount || 1}
                          onChange={(e) => handleModifyChange(e, item.cartItemId)}
                        />
                      </Box>
                    </Box>
                  </motion.div>
                </Box>
              );
            })}
          </CheckList>
        ) : (
          <Center flexDir={'column'}>
            <Box w='2rem' mt='1.4rem'>
              <img src={'https://s.yezgea02.com/1604028375097/empty-car.png'} />
            </Box>
            <Box mt='0.2rem'>
              <Button color='primary' onClick={() => navigate('/shop')}>
                前往选购
              </Button>
            </Box>
          </Center>
        )}
      </Box>
      {cartList.length > 0 && (
        <Flex
          justify={'space-between'}
          pos='fixed'
          w='100%'
          bg='#fff'
          b='0.555rem'
          align={'center'}
          borderTop={'1px solid #ebedf0'}
        >
          <Box p='0.06rem' onClick={() => setCheck(!check)}>
            <Radio block checked={check}>
              全部选择
            </Radio>
          </Box>
          <Box p='0.06rem 0.2rem'>
            <Button block color='primary' size='middle' onClick={() => onSubmit()}>
              结算
            </Button>
          </Box>
        </Flex>
      )}
    </div>
  );
};

export default Cart;
