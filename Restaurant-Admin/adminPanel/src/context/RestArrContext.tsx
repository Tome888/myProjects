import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useUserLoginContext } from "./UserLoginContext";

interface RestArrContextType {
  arrRest: any[];
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const RestArrContext = createContext<RestArrContextType | undefined>(undefined);

interface RestArrContextProviderProps {
  children: ReactNode;
}

const RestArrContextProvider: React.FC<RestArrContextProviderProps> = ({
  children,
}) => {
  const [arrRest, setArrRest] = useState<any[]>([]);
  const [toggle, setToggle] = useState(false);
  const { tokenData } = useUserLoginContext();
  useEffect(() => {
    if (tokenData) {
      fetch(`http://localhost:5000/restaurants`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.restu.restaurants);
          setArrRest(data.restu.restaurants);
        })
        .catch((err) => console.error(err, "Something wrong happened"));
    } else {
      return;
    }
  }, [toggle, tokenData]);

  return (
    <RestArrContext.Provider value={{ arrRest, toggle, setToggle }}>
      {children}
    </RestArrContext.Provider>
  );
};

const useRestArrContext = () => {
  const context = useContext(RestArrContext);
  if (context === undefined) {
    throw new Error(
      "useRestArrContext must be used within a RestArrContextProvider"
    );
  }
  return context;
};

export { RestArrContextProvider, useRestArrContext };
