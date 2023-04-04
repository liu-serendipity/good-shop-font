import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  HTMLChakraProps,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  LightMode,
  DarkMode,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion, useAnimationControls } from 'framer-motion';

import { getViewPort } from '@/utils';
import { rootFontSize } from '@/utils/resize';
import * as lock from '@/utils/lock';

import { HeaderProps } from './Header.types';

const Container = styled(Box)({
  position: 'fixed',
  width: '100%',
  zIndex: 100000,
});

export function Header({ pageName }: HeaderProps) {
  return <Container>{pageName}</Container>;
}
