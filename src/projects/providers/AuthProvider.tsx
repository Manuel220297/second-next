import { getLoggedInUser } from '@/lib/server/appwrite';
import { createContext, ReactNode, use, useContext, useEffect, useState } from 'react';
type AuthContextType = {
  isAuthenticated: boolean;
  currentUser: any;
  setIsAuthenticated: (auth: boolean) => void;
  setCurrentUser: (user: any) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

import React from 'react';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { isAuthenticated, user } = await getLoggedInUser();
      setIsAuthenticated(isAuthenticated);
      setCurrentUser(user);
    };

    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser }}> {children} </AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be use  within an authProvider');
  }

  return context;
};
