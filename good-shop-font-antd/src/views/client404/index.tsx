import React from 'react';
import { Button } from 'antd-mobile';
import { Box, Text, Center } from '@/components';
import { useNavigate } from 'react-router-dom';

import bg404 from './imgs/bg404.webp';

const Client404 = () => {
  const navigate = useNavigate();
  return (
    <div className='client404' style={{ width: '100%', height: '100vh' }}>
      <Center w='100%' h='100%'>
        <Box>
          <img src={bg404} />
          <Box m='0.2rem auto'>
            <Button color='primary' fill='outline' size='mini' onClick={() => navigate('/home')}>
              <Text c='#1677ff' fz='0.12rem'>
                返回首页
              </Text>
            </Button>
          </Box>
        </Box>
      </Center>
    </div>
  );
};

export default Client404;
