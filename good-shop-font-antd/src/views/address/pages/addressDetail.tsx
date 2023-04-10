import React, { useEffect, useState, useRef } from 'react';
import { NavBar, Form, Input, Button, CascaderView, Toast, Popup } from 'antd-mobile';
import { Box } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useAddressContext } from '@/hooks/useAddressContex';
import { useSearchParams } from 'react-router-dom';
import { tdist } from '@/utils/address';
import { sleep, handleIsEmpty } from '@/utils';

const AddressDetail = () => {
  const { addressDetail, fetchUserAddressDetail, fetchEditUserAddress, fetchAddAddress, fetchDeleteAddress } =
    useAddressContext();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const addressId = search.get('addressId' || '');
  const type = search.get('type' || '');
  const [switchStatus, setSwitchStatus] = useState(false);
  const [location, setLocation] = useState([]);
  const options: any = [];
  const [visPopup, setVisPopup] = useState(false);
  const province_list = {};
  const city_list = {};
  const county_list = {};

  useEffect(() => {
    setSwitchStatus(addressDetail.defaultFlag === 1 ? true : false);
  }, [addressDetail]);

  useEffect(() => {
    type === 'edit' && fetchUserAddressDetail(addressId);
  }, []);

  useEffect(() => {
    location.length === 3 && setVisPopup(false);
  }, [location.length]);

  // @ts-ignore
  tdist.getLev1().forEach((p) => {
    // @ts-ignore
    province_list[p.id] = p.text;
    // @ts-ignore
    tdist.getLev2(p.id).forEach((c) => {
      // @ts-ignore
      city_list[c.id] = c.text;
      // @ts-ignore
      tdist.getLev3(c.id).forEach((q) => (county_list[q.id] = q.text));
    });
  });

  for (const item in province_list) {
    const firstFontTwoNums = item.slice(0, 2);
    // @ts-ignore
    options.push({ label: province_list[item], value: province_list[item], children: [] });
    for (const item2 in city_list) {
      const secoundFontTwoNums = item2.slice(0, 2);
      const secoundFontFourNums = item2.slice(0, 4);
      if (firstFontTwoNums === secoundFontTwoNums) {
        // @ts-ignore
        options[options.length - 1].children.push({
          // @ts-ignore
          label: city_list[item2],
          // @ts-ignore
          value: city_list[item2],
          children: [],
        });
        for (const item3 in county_list) {
          const thirdFontFourNums = item3.slice(0, 4);
          if (secoundFontFourNums === thirdFontFourNums) {
            // @ts-ignore
            options[options.length - 1].children[options[options.length - 1].children.length - 1].children.push({
              // @ts-ignore
              label: county_list[item3],
              // @ts-ignore
              value: county_list[item3],
            });
          }
        }
      }
    }
  }

  const onFinish = async (val: any) => {
    const { userName, userPhone, detailAddress } = val;
    const params = {
      userName: userName || addressDetail.userName,
      userPhone: userPhone || addressDetail.userPhone,
      provinceName: addressDetail.provinceName || location[0],
      cityName: addressDetail.cityName || location[1],
      regionName: addressDetail.regionName || location[2],
      detailAddress: detailAddress || addressDetail.detailAddress,
      defaultFlag: switchStatus ? 1 : 0,
    };
    if (type === 'edit') {
      // @ts-ignore
      params['addressId'] = addressId;
    }

    if (
      handleIsEmpty(params.userName, '姓名') &&
      handleIsEmpty(params.userPhone, '电话') &&
      handleIsEmpty(params.regionName, '地区')
    ) {
      type === 'add' ? fetchAddAddress(params) : fetchEditUserAddress(params);
      Toast.show('保存成功！');
      await sleep(800);
      window.location.href = '/v/address';
    }
  };

  const onDelete = async () => {
    fetchDeleteAddress(addressId);
    Toast.show('删除成功！');
    await sleep(800);
    window.location.href = '/v/address';
  };

  return (
    addressDetail && (
      <Box w='100%' h='100vh' bg={'#fff'} pos='absolute' t='0' zIndex={90}>
        <Box pos={'fixed'} w='100%' bg='#fff'>
          <NavBar onBack={() => navigate('/address')}>编辑地址</NavBar>
        </Box>
        <Box pt='0.45rem' w='100%'>
          <Form
            layout='horizontal'
            onFinish={onFinish}
            footer={
              <Box m='auto'>
                <Button block type='submit' color='primary' size='middle'>
                  保存
                </Button>
              </Box>
            }
          >
            <Form.Item label='姓名' name='userName'>
              <Input
                placeholder={type === 'edit' ? addressDetail.userName || '请输入姓名' : '请输入姓名'}
                clearable
                type='text'
              />
            </Form.Item>
            <Form.Item label='电话' name='userPhone'>
              <Input
                placeholder={type === 'edit' ? addressDetail.userPhone || '请输入电话' : '请输入电话'}
                clearable
                type='number'
              />
            </Form.Item>
            <Form.Item label='地区' name='address' onClick={() => setVisPopup(true)}>
              <Input
                placeholder={
                  type === 'edit'
                    ? `${addressDetail.provinceName || ''} ${addressDetail.cityName || ''} ${
                        addressDetail.regionName || ''
                      }`
                    : location.length > 0
                    ? `${location.join(' ')}`
                    : '点击选择地区'
                }
                clearable
                type='number'
              />
            </Form.Item>
            <Form.Item label='详细地址' name='detailAddress'>
              <Input
                placeholder={type === 'edit' ? addressDetail.detailAddress || '请输入详细地址' : '请输入详细地址'}
                clearable
                type='text'
              />
            </Form.Item>
            <Form.Item
              label='设为默认收货地址'
              extra={
                <Box
                  border={'1px solid #cccccc'}
                  br='50%'
                  w='0.2rem'
                  h='0.2rem'
                  m='0.2rem'
                  bg={switchStatus ? '#1677ff' : '#fff'}
                  onClick={() => setSwitchStatus(!switchStatus)}
                >
                  {switchStatus && (
                    <svg viewBox='0 0 40 40'>
                      <path
                        d='M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z'
                        fill='#fff'
                      ></path>
                    </svg>
                  )}
                </Box>
              }
              style={{ '--prefix-width': '2rem' }}
            ></Form.Item>
          </Form>
          {type === 'edit' && (
            <Box m='auto'>
              <Button color='danger' type='submit' size='middle' onClick={() => onDelete()}>
                删除
              </Button>
            </Box>
          )}
        </Box>
        <Popup
          visible={visPopup}
          onMaskClick={() => {
            setVisPopup(false);
          }}
          bodyStyle={{ height: '40vh' }}
        >
          <CascaderView
            style={{ '--height': '3rem' }}
            options={options}
            value={location}
            onChange={(val: any, extend) => {
              setLocation(val);
            }}
          />
        </Popup>
      </Box>
    )
  );
};

export default AddressDetail;
