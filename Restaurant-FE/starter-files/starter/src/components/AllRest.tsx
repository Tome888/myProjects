import { useContext } from "react";

import { Data } from "../context/ApiContext";

import { Card } from "./Card";
import { FuncMedian } from "../context/MedianContext";

export function AllRest() {
  const context = useContext(Data);
  const medianFunc = useContext(FuncMedian);

  if (!context) {
    return <p>Loading...</p>;
  }
  if (!medianFunc) {
    return null;
  }

  const { apiData } = context;

  return (
    <section className="allRestaurantsSection">
      <h2>All Restaurants</h2>
      <div className="cardContainer">
        {apiData ? (
          apiData.map((rest, idx) => (
            <Card
              key={rest.id}
              id={rest.id}
              image={rest.image}
              businessname={rest.businessname}
              restauranttype={rest.restauranttype}
              amountReviews={rest.reviews}
              totalRating={medianFunc.calculateMedianRating(rest.reviewsList)}
              index={idx}
              objRestaurant={rest}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}
