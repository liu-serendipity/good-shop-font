import React from 'react';
import styled from '@emotion/styled';

interface Props {
  m?: any;
  w?: any;
  h?: any;
  p?: any;
  pt?: any;
  pl?: any;
  pr?: any;
  pb?: any;
  zIndex?: number;
  mt?: any;
  ml?: any;
  mr?: any;
  mb?: any;
  bg?: any;
  boxShadow?: any;
  br?: any;
  align?: any;
  justify?: any;
  pos?: any;
  b?: any;
  flexDir?: any;
  flexWrap?: any;
  borderTop?: any;
}

export const Flex = styled.div((props: Props) => ({
  display: 'flex',
  width: props.w || '100%',
  height: props.h,
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
  boxShadow: props.boxShadow,
  borderRadius: props.br,
  alignItems: props.align,
  justifyContent: props.justify,
  position: props.pos,
  bottom: props.b,
  flexDirection: props.flexDir,
  flexWrap: props.flexWrap,
  borderTop: props.borderTop,
}));
