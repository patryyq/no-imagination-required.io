import { useContext } from 'react';
import UserProvider from './contexts/UserProvider';

const useIsLogged = () => {
    const userData = useContext(UserProvider.Context);
    return userData ? [true, userData] : [false, null]
}

export default useIsLogged
