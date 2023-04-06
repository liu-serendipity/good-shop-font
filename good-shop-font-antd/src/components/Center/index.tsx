import React from 'react';
import styled from '@emotion/styled';

interface Props {
  m?: string;
  w?: string;
  zIndex?: number;
}

export const Center = styled.div((props: Props) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: props.m || 0,
  width: props.w || '100%',
  zIndex: props.zIndex,
}));
