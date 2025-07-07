// context.tsx
import { createContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  loginData: any;
  isAuthLoading: boolean;
  saveLoginData: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loginData, setLoginData] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const saveLoginData = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const decoded = jwtDecode(token);
      setLoginData(decoded);
    } catch (err) {
      localStorage.clear();
      setLoginData(null);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setLoginData(null);
  };

  useEffect(() => {
    saveLoginData();
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, isAuthLoading, saveLoginData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
