import { useContext } from 'react';
import { AddressContext } from '@/contexts/Address';
export const useAddressContext = () => useContext(AddressContext);
