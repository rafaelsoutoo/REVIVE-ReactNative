// AuthContext.tsx
import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from '@services/api';
import { UserDTO } from "@dtos/UserDTO";
import { AppError } from "@utils/AppError";
import { RegisterDTO } from "@dtos/RegisterDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });
      if (data.user && data.token) {
        setUser(data.user);
      }

    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw new AppError('E-mail e/ou senha incorreta');
      } else {
        throw new AppError('Erro ao fazer login. Tente novamente mais tarde.');
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
