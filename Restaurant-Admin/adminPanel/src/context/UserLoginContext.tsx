import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface UserLoginContextType {
  tokenData: string;
  setTokenData: React.Dispatch<React.SetStateAction<string>>;
}

const UserLoginContext = createContext<UserLoginContextType | undefined>(
  undefined
);

interface UserLoginContextProviderProps {
  children: ReactNode;
}

export function UserLoginContextProvider({
  children,
}: UserLoginContextProviderProps) {
  const [tokenData, setTokenData] = useState<string>("");

  useEffect(() => {
    console.log(tokenData, "from effect");
  }, [tokenData]);

  const validateTheToken = (tokenFromLs: any) => {
    fetch(`http://localhost:5000/validateToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": "86dg6qwd6g7878g0D68G97y9SF8Y9-sfgy8AD",
      },
      body: JSON.stringify({ token: tokenFromLs }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("From validation", data);
        if (data.valid) {
          setTokenData(tokenFromLs);
        } else {
          setTokenData("");
        }
      });
  };
  useEffect(() => {
    const tokenLs = localStorage.getItem("tokenUser");

    if (tokenLs) {
      validateTheToken(tokenLs);
    } else {
      console.log("NO TOKEN FOUND IN LS");
    }
  }, []);

  return (
    <UserLoginContext.Provider value={{ tokenData, setTokenData }}>
      {children}
    </UserLoginContext.Provider>
  );
}

export function useUserLoginContext() {
  const context = useContext(UserLoginContext);
  if (context === undefined) {
    throw new Error(
      "useUserLoginContext must be used within a UserLoginContextProvider"
    );
  }
  return context;
}
