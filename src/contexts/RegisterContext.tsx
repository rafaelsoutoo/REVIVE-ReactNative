import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RegisterContextProps {
    register: string[];
    addRegister: (name: string) => void;
}

const RegisterContext = createContext<RegisterContextProps | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [register, setRegister] = useState<string[]>([]);

    const addRegister = (name: string) => {
        setRegister(prevState => [...prevState, name]);
    };

    return (
        <RegisterContext.Provider value={{ register, addRegister }}>
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = () => {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error('useRegister must be used within a RegisterProvider');
    }
    return context;
};
