import Head from 'next/head';

import * as data from '@/data/common';

export type PageHeadProps = {
  title: string;
  description: string;
  keywords: string;
};

export function PageHead({ title, description, keywords }: PageHeadProps) {
  return (
    <Head>
      <title>{data.page.title || title}</title>
      <meta name='description' content={description || data.page.description} />
      <meta name='keywords' content={keywords || data.page.keywords}></meta>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='renderer' content='webkit'></meta>
      <meta httpEquiv='X-UA-Compatible' content='IE=edge'></meta>
    </Head>
  );
}
