import { HTMLChakraProps } from '@chakra-ui/react';

export interface HeaderProps extends HTMLChakraProps<'div'> {
  position?: 'relative' | 'fixed' | 'absolute';
  mode?: 'dark' | 'light';
  showHead?: boolean;
  sticky?: boolean;
}

export type SensorProps = {
  pageName?: string;
};
