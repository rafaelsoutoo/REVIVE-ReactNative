import { createContext, ReactNode } from "react";
import { api } from '@services/api';

export type AuthContextDataProps = {
  signIn: (email: string, password: string) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });
      console.log('ebaaaa', data);
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
