import { useContext } from 'react';
import { CartContext } from '@/contexts/Cart';
export const useCartContext = () => useContext(CartContext);
