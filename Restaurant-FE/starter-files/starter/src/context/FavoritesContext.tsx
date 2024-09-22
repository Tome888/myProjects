import React, { createContext, useEffect, useState } from "react";
import { Restaurant } from "./ApiContext";

interface FavoritesProps {
  children: React.ReactElement;
}

interface FavoritesContextType {
  favArr: Restaurant[] | undefined;
  setFavArr: React.Dispatch<React.SetStateAction<Restaurant[] | undefined>>;
  indexArr: number[];
  setIndexArr: React.Dispatch<React.SetStateAction<number[]>>;
}

export const FavoritesArray = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesContext({ children }: FavoritesProps) {
  const [favArr, setFavArr] = useState<Restaurant[] | undefined>([]);
  const [indexArr, setIndexArr] = useState<number[]>([]);

  useEffect(() => {
    const favArrLS = localStorage.getItem("favArrLS");
    const indexArrLS = localStorage.getItem("indexArrLS");

    if (favArrLS) {
      const parsedFavArr = JSON.parse(favArrLS);
      setFavArr(parsedFavArr);
      console.log("Loaded favorites from localStorage:", parsedFavArr);
    } else {
      console.log("No favorites in localStorage");
    }

    if (indexArrLS) {
      const parsedIndexArr = JSON.parse(indexArrLS);
      setIndexArr(parsedIndexArr);
      console.log("Loaded indexes from localStorage:", parsedIndexArr);
    } else {
      console.log("No indexes in localStorage");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favArrLS", JSON.stringify(favArr));
    console.log("Updated localStorage with favorites:", favArr);
  }, [favArr]);

  useEffect(() => {
    localStorage.setItem("indexArrLS", JSON.stringify(indexArr));
    console.log("Updated localStorage with indexes:", indexArr);
  }, [indexArr]);

  return (
    <FavoritesArray.Provider
      value={{ favArr, setFavArr, indexArr, setIndexArr }}
    >
      {children}
    </FavoritesArray.Provider>
  );
}
