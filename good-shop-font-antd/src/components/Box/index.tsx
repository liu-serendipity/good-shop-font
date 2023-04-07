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
  bg?: any;
  boxShadow?: any;
  br?: any;
}

export const Box = styled.div((props: Props) => ({
  position: props.pos,
  width: props.w || 'fit-content',
  height: props.h,
  zIndex: props.zIndex,
  textAlign: props.ta || 'left',
  color: props.c || '#424242',
  top: props.t,
  bottom: props.b,
  left: props.l,
  right: props.r,
  padding: props.p,
  paddingTop: props.pt,
  paddingLeft: props.pl,
  paddingRight: props.pr,
  paddingBottom: props.pb,
  margin: props.m,
  marginTop: props.mt,
  marginLeft: props.ml,
  marginRight: props.mr,
  marginBottom: props.mb,
  background: props.bg,
  boxShadow: props.boxShadow,
  borderRadius: props.br,
}));
