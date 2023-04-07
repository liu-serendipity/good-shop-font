import React from 'react';
import styled from '@emotion/styled';

interface Props {
  m?: any;
  w?: any;
  h?: any;
  pt?: any;
  pl?: any;
  pr?: any;
  pb?: any;
  zIndex?: number;
  mt?: any;
  ml?: any;
  mr?: any;
  mb?: any;
}

export const Flex = styled.div((props: Props) => ({
  display: 'flex',
  width: props.w || '100%',
  height: props.h,
  zIndex: props.zIndex || 0,
  paddingTop: props.pt || 0,
  paddingLeft: props.pl || 0,
  paddingRight: props.pr || 0,
  paddingBottom: props.pb || 0,
  margin: props.m || 0,
  marginTop: props.mt || 0,
  marginLeft: props.ml || 0,
  marginRight: props.mr || 0,
  marginBottom: props.mb || 0,
}));
