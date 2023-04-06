import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { Center, Box, ImageVerify, Flex } from '@/components';
import { login, register } from '@/api';
// @ts-ignore
import md5 from 'js-md5';
import { sleep } from '@/utils';

import signed_logo from './imgs/signed_logo.png';
import footer from './imgs/footer.gif';

const Container = styled.div`
  width: 100%;
  background-color: bisque;
  position: fixed;
  height: 100vh;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
`;

const Logo = styled.div`
  margin: auto;
  width: 1.6rem;
  padding-top: 0.6rem;
`;

const Login = () => {
  const [imageCode, setImageCode] = useState<string>('');
  const [type, setType] = useState('login');
  const loadingRef: any = useRef(null);

  const handleLoading = () => {
    loadingRef.current = Toast.show({ content: '加载中...', duration: 0 });
  };

  const onFinish = async (value: any) => {
    if (value.verificationCode.toLowerCase() !== imageCode.toLowerCase()) {
      Toast.show('验证码错误！');
      return null;
    }
    handleLoading();
    if (type === 'login') {
      const res = await login({ loginName: value.username, passwordMd5: md5(value.password) });
      // @ts-ignore
      window.localStorage.setItem('token', res);
      loadingRef.current?.close();
      Toast.show('登陆成功！');
      await sleep(800);
      window.location.href = '/v/home';
      return null;
    } else {
      await register({ loginName: value.username, password: value.password });
      loadingRef.current?.close();
      Toast.show('注册成功！');
      await sleep(800);
      window.location.href = '/v/';
      return null;
    }
  };

  const toggle = (val: string) => {
    Toast.show('已切换！');
    setType(val);
  };

  return (
    <Container>
      <Logo>
        <img src={signed_logo} />
      </Logo>
      <Footer>
        <img src={footer} />
      </Footer>
      <Center m='0.16rem 0 0 0'>
        <Box w='3rem'>
          <Form
            onFinish={onFinish}
            footer={
              <Flex w='100%'>
                <Box w='1rem' m='auto'>
                  <Button block type='submit' color='primary' size='middle'>
                    提交
                  </Button>
                </Box>
                {type === 'login' ? (
                  <Box
                    pos={'absolute'}
                    ta={'center'}
                    p='0.06rem 0.12rem'
                    c='#007fff'
                    onClick={() => toggle('register')}
                  >
                    立即注册
                  </Box>
                ) : (
                  <Box pos={'absolute'} ta={'center'} p='0.06rem 0.12rem' c='#007fff' onClick={() => toggle('login')}>
                    立即登陆
                  </Box>
                )}
              </Flex>
            }
          >
            <Form.Item label='用户名' name='username' rules={[{ required: true, message: '用户名不能为空' }]}>
              <Input placeholder='请输入用户名' clearable type='number' />
            </Form.Item>
            <Form.Item label='密码' name='password' rules={[{ required: true, message: '密码不能为空' }]}>
              <Input placeholder='请输入密码' clearable type='password' />
            </Form.Item>
            <Form.Item name='verificationCode' rules={[{ required: true, message: '验证码不能为空' }]}>
              <Flex>
                <Input placeholder='请输入验证码' clearable type='text' />
                <ImageVerify onSubmit={(val) => setImageCode(val)} />
              </Flex>
            </Form.Item>
          </Form>
        </Box>
      </Center>
    </Container>
  );
};

export default Login;
