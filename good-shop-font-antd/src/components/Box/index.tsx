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
  border?: any;
  borderLeft?: any;
  borderBottom?: any;
  borderBottomLeftRadius?: any;
  borderTopLeftRadius?: any;
  borderTopRightRadius?: any;
  borderBottomRightRadius?: any;
  borderTop?: any;
  fz?: any;
  ws?: any;
  of?: any;
  tof?: any;
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
  border: props.border,
  borderLeft: props.borderLeft,
  borderBottom: props.borderBottom,
  borderBottomLeftRadius: props.borderBottomLeftRadius,
  borderTopLeftRadius: props.borderTopLeftRadius,
  borderTopRightRadius: props.borderTopRightRadius,
  borderBottomRightRadius: props.borderBottomRightRadius,
  borderTop: props.borderTop,
  fontSize: props.fz,
  whiteSpace: props.ws,
  overflow: props.of,
  textOverflow: props.tof,
}));
