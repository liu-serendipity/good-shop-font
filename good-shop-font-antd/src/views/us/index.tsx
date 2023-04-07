import React from 'react';
import { NavBar } from 'antd-mobile';
import { Box, Center } from '@/components';
import { useNavigate } from 'react-router-dom';

const Us = () => {
  const navigate = useNavigate();

  return (
    <div className='us'>
      <Box pos={'fixed'} w='100%'>
        <NavBar onBack={() => navigate(-1)}>关于我们</NavBar>
      </Box>
      <Center pt='0.45rem' w='100%'>
        <p>作者：LLM</p>
      </Center>
    </div>
  );
};

export default Us;
