import { useContext } from "react";
import { FavoritesArray } from "../context/FavoritesContext";
import { Data } from "../context/ApiContext";

interface HeartProps {
  CardId: string;
  CardIndex: number;
}

export function HeartFavorite({ CardId, CardIndex }: HeartProps) {
  const FavoriteContext = useContext(FavoritesArray);
  const DataContext = useContext(Data);

  if (!DataContext) {
    return <p>Loading...</p>;
  }
  if (!FavoriteContext) {
    return <p>Loading...</p>;
  }

  const { apiData } = DataContext;
  const { favArr, setFavArr, indexArr, setIndexArr } = FavoriteContext;

  const addToFavFunc = (idCard: string, cardIndex: number, event: any) => {
    event.preventDefault();

    if (favArr && favArr.find((card) => card.id === idCard)) {
      const updatedArr = favArr.filter((card) => card.id !== idCard);
      const updatedIndexArr = indexArr.filter((index) => index !== cardIndex);
      setFavArr(updatedArr);
      setIndexArr(updatedIndexArr);
    } else {
      const foundFavorite = apiData?.find((card) => card.id === idCard);
      if (foundFavorite) {
        setFavArr((prevFavArr) => [...(prevFavArr || []), foundFavorite]);
        setIndexArr((prevIndexArr) => [...(prevIndexArr || []), cardIndex]);
      }
    }
  };

  const typeOfHeart = (idCard: string, cardIndex: number) => {
    if (favArr && favArr.some((cardRest) => cardRest.id === idCard)) {
      return (
        <i
          onClick={(e) => addToFavFunc(idCard, cardIndex, e)}
          className="fa-solid fa-heart fa-2x heart"
          style={{ color: "#FF6247" }}
        ></i>
      );
    } else {
      return (
        <i
          onClick={(e) => addToFavFunc(idCard, cardIndex, e)}
          className="fa-regular fa-heart fa-2x heart"
          style={{ color: "#FF6247" }}
        ></i>
      );
    }
  };

  return <>{typeOfHeart(CardId, CardIndex)}</>;
}
