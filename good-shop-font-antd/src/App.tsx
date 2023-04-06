import React, { Suspense } from 'react';
import './App.css';

import routes from '@/routes';
import { RouterGurad } from '@/routes/routerGuard';

function App() {
  return (
    <div className='App'>
      <Suspense>{RouterGurad(routes)}</Suspense>
    </div>
  );
}

export default App;
