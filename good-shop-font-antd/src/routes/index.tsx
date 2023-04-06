import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '@/views/home';

const Login = lazy(() => import('@/views/login'));
const About = lazy(() => import('@/views/about'));
const Cart = lazy(() => import('@/views/cart'));
const Shop = lazy(() => import('@/views/shop'));

// export const BasicRoute = () => {
//   return (
//     <Suspense fallback={<div></div>}>
//       <Routes>
//         <Route path="/" element={<Navigate to="/home" />}></Route>
//         <Route path="/home" element={<Home />}></Route>
//         <Route path="/login" element={<Login />}></Route>
//         <Route path="/about" element={<About />}></Route>
//         <Route path="/cart" element={<Cart />}></Route>
//         <Route path="/shop" element={<Shop />}></Route>
//       </Routes>
//     </Suspense>
//   );
// };

export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: any;
  path?: string;
  auth?: boolean;
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/login' replace={true} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
    auth: true,
  },
  {
    path: '/shop',
    element: <Shop />,
    auth: true,
  },
  {
    path: '/cart',
    element: <Cart />,
    auth: true,
  },
  {
    path: '/about',
    element: <About />,
    auth: true,
  },
];

export default routes;
