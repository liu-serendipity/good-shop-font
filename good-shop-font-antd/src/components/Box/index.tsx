import React from 'react';
import styled from '@emotion/styled';

interface Props {
  m?: string;
  w?: string;
  h?: any;
  p?: string;
  zIndex?: number;
  pos?: any;
  ta?: any;
  c?: any;
}

export const Box = styled.div((props: Props) => ({
  margin: props.m || 0,
  width: props.w || 'fit-content',
  height: props.h,
  padding: props.p || 0,
  zIndex: props.zIndex,
  position: props.pos || 'static',
  textAlign: props.ta || 'left',
  color: props.c || '#424242',
}));
