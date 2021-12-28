import { 
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

import * as AuthSession from 'expo-auth-session';

import {
  REDIRECT_URI,
  SCOPE,
  RESPONSE_TYPE,
  CLIENT_ID,
  CDN_IMAGE,
} from '../configs/discord.auth';

import { api } from "../services/api";

interface User {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

interface AuthContextData {
  user: User;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps) {
  const [ user, setUser ] = useState<User>({} as User);
  const [ loading, setLoading ] = useState(false);

  async function signIn() {
    try {
      setLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });
      
      console.log(response);
    } catch {
      throw new Error('Não foi possível autenticar');
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook
function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export {
  AuthProvider,
  useAuth,
};