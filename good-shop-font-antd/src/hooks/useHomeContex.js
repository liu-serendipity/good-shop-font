import { useContext } from 'react';
import { HomeContext } from '../contexts/Home';
export const useHomeContext = () => useContext(HomeContext);
