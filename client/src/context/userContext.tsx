
import { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/user';


import type { UserType } from '../types/UserType';

type UserContextType = {
    user: UserType,
    isLoading: boolean
}


export const UserContext = createContext<UserContextType|null>(null);


export const UserContextProvider = ({ children }: {children: React.ReactNode}) => {
    
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                return await getUser(); 
            } catch (err) {
                console.log('error: ', err);
                return null;
            }
        }
    })



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


