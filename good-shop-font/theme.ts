import { extendTheme } from '@chakra-ui/react';

export const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  facebook: null,
  pink: null,
  twitter: null,
  linkedin: null,
  messenger: null,
  whatsapp: null,
  telegram: null,
  gray: null,
  red: null,
  orange: null,
  yellow: null,
  green: null,
  teal: null,
  blue: null,
  cyan: null,
  purple: null,
};

export const breakpoints = {
  'base': '320px',
  'sm': '320px',
  'md': '768px',
  'lg': '960px',
  'xl': '1200px',
  '2xl': '1536px',
};

export const theme = extendTheme({
  fonts: {
    heading: `'AlibabaPuHuiTi-2-55-Regular', sans-serif`,
    body: `'AlibabaPuHuiTi-2-55-Regular', sans-serif`,
  },
  colors: null,
  brand: { cc: 'cc' },
  breakpoints,
});
