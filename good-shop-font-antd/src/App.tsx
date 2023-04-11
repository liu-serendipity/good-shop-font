import React, { Suspense } from 'react';
import './App.css';
import { Footer } from './components';

import routes from '@/routes';
import { RouterGurad } from '@/routes/routerGuard';
import { isPathPartlyExisted } from '@/utils';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className='App'>
      <Suspense fallback={<div></div>}>{RouterGurad(routes)}</Suspense>
      {isPathPartlyExisted(path) && <Footer />}
    </div>
  );
}

export default App;
