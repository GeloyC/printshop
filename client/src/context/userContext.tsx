
import { createContext, useContext } from 'react';

import type { UserType } from '../types/user.type';
import { useGetUser } from '../hooks/useGetUser';

type UserContextType = {
    user: UserType,
    isLoading: boolean
}


export const UserContext = createContext<UserContextType|null>(null);


export const UserContextProvider = ({ children }: {children: React.ReactNode}) => {
    
    const { data: user, isLoading } = useGetUser();

    return (
        <UserContext.Provider value={{ 
            user: user ?? null,
            isLoading
        }} >
            { children }
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error('useUserContext must be used within UserContextProvider');
    }

    return userContext;
}


