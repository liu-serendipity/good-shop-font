import { useContext } from 'react';
import { UserContext } from '../contexts/User';
export const useUserContext = () => useContext(UserContext);
