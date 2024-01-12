import { createContext, useContext, useState } from 'react';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [registerSucces, setRegisterSucces] = useState(null)
    const contextValue = {
        registerSucces,
        setRegisterSucces
    }
    return(<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>)
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}
