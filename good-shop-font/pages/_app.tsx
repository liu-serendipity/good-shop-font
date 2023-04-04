import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Box } from '@chakra-ui/react';

import { resize } from '@/utils/resize';

import './style.css';

export default function App({ Component, pageProps }: AppProps) {
  const [opacity, setOpacity] = useState<number>(0);
  useEffect(() => {
    resize();
    setOpacity(1);
  }, []);

  console.log('render _app.tsx', pageProps);

  return (
    <Box style={{ opacity: opacity }} transition='opacity 1.1806s cubic-bezier(0.04, 0.04, 0.12, 0.96)'>
      <Component {...pageProps} />
    </Box>
  );
}
