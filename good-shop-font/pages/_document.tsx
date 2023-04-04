import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import { CSSReset } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

import { MainLayout } from '@/layout/MainLayout';

import { theme } from '../theme';
export default function CustomDocument(props: DocumentProps) {
  return (
    <Html lang='zh-cmn-Hans'>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='//static-card.dushu365.com/static/components/dplayer@v1.25.0/dplayer.min.css' />
        <script defer src='//static-card.dushu365.com/static/components/hls@v0.12.4/hls.min.js'></script>
        <script defer src='//static-card.dushu365.com/static/components/dplayer@v1.25.0/dplayer.min.js'></script>
        <CSSReset />
      </Head>
      <body>
        <ChakraProvider theme={theme}>
          <MainLayout path={props.dangerousAsPath}>
            <Main />
          </MainLayout>
        </ChakraProvider>
        <NextScript />
      </body>
    </Html>
  );
}
