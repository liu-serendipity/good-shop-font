import React from 'react';
import styled from '@emotion/styled';

interface Props {
  ta?: any;
  lh?: string;
  c?: any;
  fz?: any;
  fw?: any;
  ff?: any;
}

export const Text = styled.span((props: Props) => ({
  textAlign: props.ta || 'left',
  lineHeight: props.lh,
  color: props.c || '#424242',
  fontSize: props.fz,
  fontWeight: props.fw,
  fontFamily: props.ff,
}));
