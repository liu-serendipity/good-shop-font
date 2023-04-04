import { ReactElement } from 'react';
import { Box } from '@chakra-ui/react';

export type MainLayoutProps = {
  children: ReactElement;
  path: string;
};

export function MainLayout({ children, path }: MainLayoutProps) {
  return <Box className={path}>{children}</Box>;
}
