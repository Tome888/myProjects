import { useContext } from "react";
import { Data } from "../context/ApiContext";
import { Card } from "./Card";
import { FuncMedian } from "../context/MedianContext";

export function MostPopular() {
  const context = useContext(Data);
  const medianFunc = useContext(FuncMedian);

  if (!context) {
    return <p>Loading...</p>;
  }
  if (!medianFunc) {
    return null;
  }
  const { apiData } = context;

  if (!apiData) {
    return <p>No data available</p>;
  }

  const sortedData = [...apiData].sort((a, b) => {
    const medianA = medianFunc.calculateMedianRating(a.reviewsList);
    const medianB = medianFunc.calculateMedianRating(b.reviewsList);
    return medianB - medianA;
  });

  const top10Rated = sortedData.slice(0, 10);
  const top10Indices = sortedData
    .slice(0, 10)
    .map((rest) => apiData.indexOf(rest));

  return (
    <div className="mostPopularContainer">
      <h2>OUR MOST POPULAR RESTAURANTS</h2>
      <div className="wrapperMostPopularCards">
        {top10Rated.map((rest, idx) => (
          <Card
            key={rest.id}
            id={rest.id}
            image={rest.image}
            businessname={rest.businessname}
            restauranttype={rest.restauranttype}
            amountReviews={rest.reviews}
            totalRating={medianFunc.calculateMedianRating(rest.reviewsList)}
            index={top10Indices[idx]}
            objRestaurant={rest}
          />
        ))}
      </div>
    </div>
  );
}
