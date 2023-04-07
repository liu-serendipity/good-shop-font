import React from 'react';
import styled from '@emotion/styled';

interface Props {
  m?: any;
  w?: any;
  h?: any;
  p?: any;
  zIndex?: number;
  pos?: any;
  ta?: any;
  c?: any;
  t?: any;
  b?: any;
  l?: any;
  r?: any;
  pt?: any;
  pl?: any;
  pr?: any;
  pb?: any;
  mt?: any;
  ml?: any;
  mr?: any;
  mb?: any;
}

export const Box = styled.div((props: Props) => ({
  position: props.pos || 'static',
  width: props.w || 'fit-content',
  height: props.h,
  zIndex: props.zIndex,
  textAlign: props.ta || 'left',
  color: props.c || '#424242',
  top: props.t,
  bottom: props.b,
  left: props.l,
  right: props.r,
  padding: props.p || 0,
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
