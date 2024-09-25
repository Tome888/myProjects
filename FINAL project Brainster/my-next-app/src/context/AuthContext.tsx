import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface SimpleAuthContextType {
  userData: string | null;
  setUserData: (value: string | null) => void;
  token: string | null;
  setToken: (value: string | null) => void;
}

const AuthContext = createContext<SimpleAuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("TOKEN");
    const storedUserData = localStorage.getItem("userData");

    if (storedToken) {
      setToken(JSON.parse(storedToken) as string);
    }

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData) as string);
    }
    console.log(userData, token);
  }, []);

  useEffect(() => {
    console.log(userData, token);
  }, [userData, token]);

  return (
    <AuthContext.Provider value={{ userData, setUserData, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): SimpleAuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
