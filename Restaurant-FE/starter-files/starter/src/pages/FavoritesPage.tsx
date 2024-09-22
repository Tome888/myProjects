import { useContext } from "react"
import { FavoritesArray } from "../context/FavoritesContext"
import { Card } from "../components/Card"
import { Review } from "../context/ApiContext";

export function FavoritesPage() {
    const FavoriteContext = useContext(FavoritesArray);
  
    if (!FavoriteContext) {
      return <p>Loading...</p>;
    }
  
    const calculateMedianRating = (reviewsList: Review[]) => {
      if (!reviewsList || reviewsList.length === 0) return 0;
      const stars = reviewsList.map((review: any) => review.stars).filter((star: number) => star !== undefined);
      stars.sort((a: number, b: number) => a - b); 
      const mid = Math.floor(stars.length / 2);

      if (stars.length % 2 === 0) {
          return (stars[mid - 1] + stars[mid]) / 2;
      } else {
          return stars[mid];
      }
  };
  
    const { favArr, indexArr } = FavoriteContext;
  
    return (
      <section className="favoritesSection">
        <h2>FAVORITES</h2>
        <div className="favoritesWrapperCards">
          {favArr && favArr.map((rest, idx) => (
            <Card
              key={rest.id}
              id={rest.id}
              image={rest.image}
              businessname={rest.businessname}
              restauranttype={rest.restauranttype}
              amountReviews={rest.reviews}
              totalRating={calculateMedianRating(rest.reviewsList)}
              index={indexArr[idx]}
            />
          ))}
        </div>
      </section>
    );
  }