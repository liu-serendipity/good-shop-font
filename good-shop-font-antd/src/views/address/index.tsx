import React, { useEffect } from 'react';
import { NavBar, List, Button, Toast } from 'antd-mobile';
import { EditSOutline } from 'antd-mobile-icons';
import { Box } from '@/components';
import { useNavigate, Outlet, useSearchParams } from 'react-router-dom';
import { useAddressContext } from '@/hooks/useAddressContex';
import { sleep } from '@/utils';

const Address = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const from = search.get('from' || '');
  const { addressList, fetchUserAddress } = useAddressContext();

  useEffect(() => {
    fetchUserAddress();
  }, []);

  const jumpToOpAddress = async (type?: string, id?: number) => {
    Toast.show('加载中...');
    await sleep(800);
    navigate({ pathname: '/address/detail', search: `addressId=${id}&type=${type}&from=${from}` });
  };

  const chooseAddress = (id: number) => {
    navigate({ pathname: '/pay', search: `addressId=${id}` });
  };

  return (
    <div className='adress'>
      <Box pos={'fixed'} w='100%'>
        <NavBar onBack={() => navigate(-1)}>地址管理</NavBar>
      </Box>
      <Box pt='0.45rem' w='100%'>
        <List header='地址列表'>
          {addressList.length > 0 &&
            addressList.map((item: any) => {
              return (
                <List.Item
                  description={`${item.provinceName}${item.cityName}${item.regionName}${item.detailAddress}`}
                  key={item.addressId}
                  extra={<EditSOutline />}
                  onClick={from ? () => chooseAddress(item.addressId) : () => jumpToOpAddress('edit', item.addressId)}
                >
                  {item.userName} {item.userPhone}&nbsp;
                  {item.defaultFlag === 1 && '(默认)'}
                </List.Item>
              );
            })}
        </List>
        <Box w='100%' pos='fixed' bg='#fff' b='0.14rem'>
          <Box m='auto'>
            <Button block type='submit' color='primary' size='middle' onClick={() => jumpToOpAddress('add')}>
              新增地址+
            </Button>
          </Box>
        </Box>
      </Box>
      <Outlet />
    </div>
  );
};

export default Address;
