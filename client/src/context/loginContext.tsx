import { createContext, useContext, useState, type SetStateAction } from "react";


type LoginContextType = {
    loginOpen: boolean
    signupOpen: boolean
    handleOpenLogin: () => void
    handleOpenSignup: () => void
    closeModal: () => void
}

export const LoginContext = createContext<LoginContextType|null>(null);


export const LoginProvider = ({
    children
}: {children: React.ReactNode}) => {

    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [signupOpen, setSignupOpen] = useState<boolean>(false);

    const handleOpenLogin = () => {
        setLoginOpen(true);
        setSignupOpen(false);
    };

    const handleOpenSignup = () => {
        setSignupOpen(true);
        setLoginOpen(false);
    };

    const closeModal = () => {
        setSignupOpen(false);
        setLoginOpen(false);
    };

    return (
        <LoginContext.Provider value={{
            loginOpen,
            signupOpen,
            handleOpenLogin,
            handleOpenSignup,
            closeModal
        }}>
            {children}
        </LoginContext.Provider>
    )
}


export const useLoginContext = () => {
    const loginContext = useContext(LoginContext);

    if (!loginContext) {
        throw new Error('useLoginContext must be used within LoginContext Provider.');
    }

    return loginContext;
}