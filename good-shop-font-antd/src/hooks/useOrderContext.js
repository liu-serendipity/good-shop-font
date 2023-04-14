import { useContext } from 'react';
import { OrderContext } from '../contexts/Order';
export const useOrderContext = () => useContext(OrderContext);
