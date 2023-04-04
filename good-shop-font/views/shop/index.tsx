import { useState, useRef, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

import { PageHead } from '@/components';
import { getViewPort } from '@/utils';

import * as data from './data';

// By default Swiper React uses core version of Swiper (without any additional components). If you want to use Navitation, Pagination and other components, you have to install them first
export function View() {
  const eleRef = useRef<any>(null);
  const [colorMode, setColorMode] = useState<'dark' | 'light'>('dark');
  const { scrollY } = useScroll({ container: eleRef });
  const scrollYRef = useRef(0);
  const [showHead, setShowHead] = useState(true);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const last = scrollYRef.current;
    const delta = latest - last;

    if (delta > 0) {
      setShowHead(false);
    } else {
      setShowHead(true);
    }

    scrollYRef.current = latest;
  });

  useEffect(() => {
    const viewport = getViewPort();

    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > viewport.height) {
          setColorMode('light');
        } else {
          setColorMode('dark');
        }
      },
      { passive: false },
    );
  }, []);

  return (
    <>
      <PageHead title={data.page.title} description={data.page.description} keywords={data.page.keywords} />
    </>
  );
}
