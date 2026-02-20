// context.tsx
import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface BookingDataType {
  startDate: string;
  endDate: string;
  capacity: number;
}

interface AuthContextType {
  loginData: any;
  isAuthLoading: boolean;
  saveLoginData: () => void;
  logout: () => void;
  BookingData: BookingDataType;
  setBookingData: React.Dispatch<React.SetStateAction<BookingDataType>>;
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

  const [BookingData, setBookingData] = useState<BookingDataType>({
    startDate: "",
    endDate: "",
    capacity: 1,
  });

  return (
    <AuthContext.Provider
      value={{
        loginData,
        isAuthLoading,
        saveLoginData,
        logout,
        BookingData,
        setBookingData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
