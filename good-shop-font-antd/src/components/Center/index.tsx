import React from 'react';
import styled from '@emotion/styled';

interface Props {
  m?: any;
  p?: any;
  w?: any;
  zIndex?: number;
  h?: any;
  pt?: any;
  pl?: any;
  pr?: any;
  pb?: any;
  mt?: any;
  ml?: any;
  mr?: any;
  mb?: any;
  bg?: any;
  br?: any;
  pos?: any;
  c?: any;
  t?: any;
  b?: any;
  l?: any;
  r?: any;
  flexDir?: any;
}

export const Center = styled.div((props: Props) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: props.h,
  width: props.w || '100%',
  zIndex: props.zIndex,
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
  borderRadius: props.br,
  position: props.pos,
  color: props.c,
  top: props.t,
  bottom: props.b,
  left: props.l,
  right: props.r,
  flexDirection: props.flexDir,
}));
