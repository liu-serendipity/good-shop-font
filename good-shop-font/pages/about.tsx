import { View } from '@/views/about';
import { UAProvider, getInitialProps } from '@/contexts/UA.js';

export default function Page({ userAgent }: { userAgent: string }) {
  return (
    <UAProvider userAgent={userAgent}>
      <View />
    </UAProvider>
  );
}

Page.getInitialProps = getInitialProps;
