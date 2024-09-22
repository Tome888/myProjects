import { useContext } from "react";
import { Data } from "../context/ApiContext";
import { Link } from "react-router-dom";

export function CuisinesBtns() {
    const context = useContext(Data);
  
    if (!context) {
      return <p>Loading...</p>;
    }
  
    const { apiData } = context;
  
    if (!apiData || apiData.length === 0) {
      return <p>No data available</p>;
    }
  
    
    const uniqueRestaurantTypes = Array.from(new Set(apiData.map(item => item.restauranttype)));
  
    return (
        <div className="filterBtnsWrapper">
          {uniqueRestaurantTypes.map((type, index) => (
            <Link to={`/cuisinesPage/${type}`} key={index}>{type}</Link>
          ))}
        </div>
        
      
    );
  }