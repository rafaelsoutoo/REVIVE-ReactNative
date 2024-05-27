import { createContext, ReactNode, useState } from "react";
import { api } from '@services/api';
import { UserDTO } from "@dtos/UserDTO";
import { storageUserSave, storageUserGet } from "@storage/storageUser";
import { storageAuthTokenSave, storageAuthTokenGet } from "@storage/storageAuthToken";

export type AuthContextDataProps = {
  user: UserDTO | null;
  signIn: (email: string, password: string) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });
      if (data.user && data.token) {
        setUser(data.user);
      }
    } catch (error) {
      throw error;
    }
  }


  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
