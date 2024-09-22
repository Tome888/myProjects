import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import { Data } from "../context/ApiContext";


export function Surprise() {
  const context = useContext(Data);
  const [randomNumb, setRandomNumState] = useState(Number);
  const [navigate, setNavigate] = useState(false);

  if (!context) {
    return <p>Loading...</p>;
  }
  const { apiData } = context;
  if (!apiData) {
    return <p>Loading...</p>;
  }

  const handleButtonClick = () => {
    const randomNumber = Math.floor(Math.random() * apiData.length);
    setRandomNumState(randomNumber);
    setNavigate(true);
  };

  if (navigate && randomNumb !== null) {
    return <Navigate to={`/restaurant/${apiData[randomNumb].id}/${randomNumb}`} />;
  }

  return (
    <section className="surpriseWrapper">
      <h2>DON'T KNOW WHAT TO EAT?</h2>
      <button onClick={handleButtonClick}>Surprise Me!</button>
    </section>
  );
 
}