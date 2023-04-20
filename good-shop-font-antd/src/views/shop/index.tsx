import React, { useEffect, useState } from 'react';
import { useGoodsContext } from '@/hooks/useGoodsContext';
import { Box, Center, Flex, Text } from '@/components';
import { NavBar, SideBar } from 'antd-mobile';
import { useNavigate, NavLink } from 'react-router-dom';
import { ShopbagOutline, SearchOutline } from 'antd-mobile-icons';

const Shop = () => {
  const { category, fetchCategory } = useGoodsContext();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (category.length > 0) {
      const id = category[0].categoryId + '';
      setActiveKey(id);
    }
  }, [category]);

  return (
    <div className='shop'>
      <Box w='100%' pos='fixed' bg='#fff' borderBottom={'1px solid #ebedf0'} zIndex={9}>
        <NavBar
          onBack={() => navigate(-1)}
          right={
            <Center onClick={() => navigate('/cart')}>
              <ShopbagOutline fontSize={26} />
            </Center>
          }
        >
          <Box w='100%' onClick={() => navigate({ pathname: '/productList', search: 'from=shop' })}>
            <Flex bg='#f7f7f7' align={'center'} justify={'center'} br='0.08rem' p='0.06rem' w='2.4rem'>
              <Box mr='0.06rem'>
                <SearchOutline />
              </Box>
              <Text c='#666' fz='0.14rem'>
                期待每一次的相遇
              </Text>
            </Flex>
          </Box>
        </NavBar>
      </Box>
      <Box pt='0.45rem' pb='0.6rem'>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'stretch' }} className='container'>
          <div style={{ flex: 'none', position: 'fixed' }} className='side'>
            <SideBar
              activeKey={activeKey}
              onChange={setActiveKey}
              style={{ '--width': '1.2rem', '--height': '5.65rem' }}
            >
              {activeKey &&
                category.map((item: any) => <SideBar.Item key={item.categoryId} title={item.categoryName} />)}
            </SideBar>
          </div>
          <div style={{ marginLeft: '1.2rem', padding: '0.2rem' }} className='main'>
            {category.map((item: any) => {
              return (
                item.categoryId == activeKey && (
                  <div
                    key={item.categoryName}
                    style={{ height: '100%', display: item.categoryId == activeKey ? 'block' : 'none' }}
                    className='content'
                  >
                    {item.secondLevelCategoryVOS.map((second: any) => {
                      return (
                        <div key={second.categoryName} className='second'>
                          <div className='second_title' style={{ fontSize: '0.16rem', fontWeight: 'bold' }}>
                            {second.categoryName}
                          </div>
                          <div
                            className='second_content'
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              paddingTop: '0.14rem',
                              paddingBottom: '0.12rem',
                            }}
                          >
                            {second.thirdLevelCategoryVOS.map((third: any) => {
                              return (
                                <NavLink
                                  key={third.categoryName}
                                  to={{ pathname: '/productList', search: `categoryId=${third.categoryId}` }}
                                >
                                  <div
                                    className='third'
                                    style={{ textAlign: 'center', marginBottom: '0.12rem', width: '0.7166rem' }}
                                  >
                                    <div>
                                      <svg
                                        className='icon'
                                        viewBox='0 0 1024 1024'
                                        version='1.1'
                                        xmlns='http://www.w3.org/2000/svg'
                                        p-id='4407'
                                        width='28'
                                        height='28'
                                      >
                                        <path
                                          d='M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z'
                                          fill='#FDEBED'
                                          p-id='4408'
                                        ></path>
                                        <path
                                          d='M640 486.4h-102.4v-102.4c0-56.32 46.08-102.4 102.4-102.4s102.4 46.08 102.4 102.4-46.08 102.4-102.4 102.4zM384 742.4c-56.32 0-102.4-46.08-102.4-102.4s46.08-102.4 102.4-102.4h102.4v102.4c0 56.32-46.08 102.4-102.4 102.4z m-102.4-358.4c0-56.32 46.08-102.4 102.4-102.4s102.4 46.08 102.4 102.4v102.4h-102.4c-56.32 0-102.4-46.08-102.4-102.4z m460.8 256c0 56.32-46.08 102.4-102.4 102.4s-102.4-46.08-102.4-102.4v-102.4h102.4c56.32 0 102.4 46.08 102.4 102.4z'
                                          fill='#EC3A4E'
                                          p-id='4409'
                                        ></path>
                                      </svg>
                                    </div>
                                    <div className='third_title'>{third.categoryName}</div>
                                  </div>
                                </NavLink>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              );
            })}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Shop;
