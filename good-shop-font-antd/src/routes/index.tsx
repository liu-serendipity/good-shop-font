import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Home from '@/views/home';

const Login = lazy(() => import('@/views/login'));
const About = lazy(() => import('@/views/about'));
const Cart = lazy(() => import('@/views/cart'));
const Shop = lazy(() => import('@/views/shop'));
const Order = lazy(() => import('@/views/order'));
const Setting = lazy(() => import('@/views/setting'));
const Address = lazy(() => import('@/views/address'));
const Us = lazy(() => import('@/views/us'));
const Client404 = lazy(() => import('@/views/client404'));

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
    element: <Navigate to='/home' replace={true} />,
    auth: true,
  },
  {
    path: '/login',
    element: <Login />,
    auth: false,
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
  {
    path: '/about/order',
    element: <Order />,
    auth: true,
  },
  {
    path: '/about/setting',
    element: <Setting />,
    auth: true,
  },
  {
    path: '/about/address',
    element: <Address />,
    auth: true,
  },
  {
    path: '/about/us',
    element: <Us />,
    auth: true,
  },
  {
    path: '/404',
    element: <Client404 />,
  },
];

export default routes;
