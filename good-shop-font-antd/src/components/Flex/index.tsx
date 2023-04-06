import React from 'react';
import styled from '@emotion/styled';

interface Props {
  m?: string;
  w?: string;
}

export const Flex = styled.div((props: Props) => ({
  display: 'flex',
  margin: props.m || 0,
  width: props.w || '100%',
}));
