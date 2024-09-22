import { useContext } from "react";
import { RandomRestaurant } from "../context/ContextRandom";
import { Data } from "../context/ApiContext";

import { DetailsSection } from "../components/DetailsSection";
import { ReviewForm } from "../components/ReviewForm";

export function SurprisePage() {
  const RandomContext = useContext(RandomRestaurant);
  const context = useContext(Data);

  if (!context) {
    return <p>Loading...</p>;
  }
  if (!RandomContext) {
    return <p>Loading...</p>;
  }
  const { apiData } = context;
  const { randomNumb } = RandomContext;

  return (
    <section>
      <h2>{apiData && apiData[randomNumb].businessname}</h2>
      <DetailsSection
        image={apiData ? apiData[randomNumb].image : ""}
        phone={apiData ? apiData[randomNumb].phone : ""}
        email={apiData ? apiData[randomNumb].email : ""}
        address={apiData ? apiData[randomNumb].address : ""}
      />
      <h2>REVIEW FORM</h2>
      <ReviewForm randomNumb={randomNumb} apiData={apiData ? apiData : []} />
    </section>
  );
}
