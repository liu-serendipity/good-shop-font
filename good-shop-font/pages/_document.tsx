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
