import React, { useRef } from 'react';
import { Box } from '@/components';
import { useUserContext } from '@/hooks/useUserContext';
import { NavBar, Input, Form, Button, Toast, Modal } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import md5 from 'js-md5';
import { sleep } from '@/utils';

const Setting = () => {
  const { fetchEditUserInfo, userInfo, fetchLogout } = useUserContext();
  const navigate = useNavigate();
  const loadingRef: any = useRef(null);

  const handleLoading = () => {
    loadingRef.current = Toast.show({ content: '加载中...', duration: 0 });
  };

  const onEdit = async (val: any) => {
    const { nickName, introduceSign, password, newPassword } = val;
    let params = {
      nickName: nickName || userInfo.nickName,
      introduceSign: introduceSign || userInfo.introduceSign,
      password: '',
    };

    if (password !== newPassword) {
      Toast.show('两次密码不一致！');
      return;
    }

    if (password) {
      params = { ...params, password: md5(password) };
    }

    handleLoading();
    await fetchEditUserInfo(params);
    loadingRef.current?.close();
    Toast.show('保存成功');
    await sleep(800);
    navigate(-1);
  };

  const onLogout = async () => {
    const result = await Modal.confirm({
      content: '确认退出登陆吗？',
    });
    if (result) {
      await fetchLogout();
      window.localStorage.setItem('token', '');
      Toast.show({ content: '退出成功！' });
      await sleep(800);
      window.location.href = '/v/';
    } else {
      return null;
    }
  };

  return (
    <div className='setting'>
      <Box pos={'fixed'} w='100%'>
        <NavBar onBack={() => navigate(-1)}>账号管理</NavBar>
      </Box>
      <Box pt='0.5rem' w='100%'>
        <Form
          onFinish={onEdit}
          footer={
            <Box w='1rem' m='auto'>
              <Button block type='submit' color='primary' size='middle'>
                保存
              </Button>
            </Box>
          }
        >
          <Form.Item label='昵称' name='nickName'>
            <Input placeholder={userInfo?.nickName || '请输入新昵称'} clearable type='text' />
          </Form.Item>
          <Form.Item label='个性签名' name='introduceSign'>
            <Input placeholder={userInfo?.introduceSign || '请输入新个性签名'} clearable type='text' />
          </Form.Item>
          <Form.Item label='修改密码' name='password'>
            <Input placeholder='请输入新密码' clearable type='password' />
          </Form.Item>
          <Form.Item label='确认新密码' name='newPassword'>
            <Input placeholder='再次输入新密码' clearable type='password' />
          </Form.Item>
        </Form>
        <Box w='1rem' m='auto'>
          <Button block type='submit' color='danger' size='middle' onClick={() => onLogout()}>
            登出
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Setting;
