import { useEffect, useState } from "react";
import { createContext } from "react";

interface ChildrenProps {
  children: React.ReactElement;
}

export interface Review {
  id: number | undefined;
  author: string | undefined;
  rating: number | undefined;
  comment: string | undefined;
  date?: string;
  stars: number | undefined;
}

export interface Restaurant {
  address: string;
  businessname: string;
  email: string;
  id: string;
  image: string;
  parkinglot: boolean;
  phone: string;
  restauranttype: string;
  reviews: number;
  reviewsList: Review[];
  slug: string;
}

interface DataContextProps {
  apiData: Restaurant[] | null;
  switchFetch: boolean;
  setSwitch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Data = createContext<DataContextProps | undefined>(undefined);

export function ApiContext({ children }: ChildrenProps): React.ReactElement {
  const [apiData, setApiData] = useState<Restaurant[] | null>(null);
  const [switchFetch, setSwitch] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/restaurants")
      .then((res) => res.json())
      .then((data) => {
        setApiData(data.restu.restaurants);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [switchFetch]);

  return (
    <Data.Provider value={{ apiData, switchFetch, setSwitch }}>
      {children}
    </Data.Provider>
  );
}
