import { 
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

import * as AuthSession from 'expo-auth-session';

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
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps) {
  const [ user, setUser ] = useState<User>({} as User);
  const [ loading, setLoading ] = useState(false);

  function SignIn() {
    try {
      setLoading(true);

      const authUrl = '';

      AuthSession
        .startAsync({ authUrl: '' });
    } catch (error) {
      
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
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