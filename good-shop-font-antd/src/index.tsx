import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '@/contexts/User';
import { AddressProvider } from '@/contexts/Address';
import { HomeProvider } from '@/contexts/Home';
import { GoodsProvider } from '@/contexts/Goods';
import { CartProvider } from '@/contexts/Cart';
import { OrderProvider } from '@/contexts/Order';

const basename = window.location.pathname.split('/v/')[0] + '/v/';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <HomeProvider>
      <UserProvider>
        <AddressProvider>
          <GoodsProvider>
            <CartProvider>
              <OrderProvider>
                <BrowserRouter basename={basename}>
                  <App />
                </BrowserRouter>
              </OrderProvider>
            </CartProvider>
          </GoodsProvider>
        </AddressProvider>
      </UserProvider>
    </HomeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
