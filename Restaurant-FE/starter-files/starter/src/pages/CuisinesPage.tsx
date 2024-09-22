import { useContext, useEffect, useState } from "react";
import { Data, Restaurant} from "../context/ApiContext";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { FuncMedian } from "../context/MedianContext";


export function CuisinesPage() {
    const [filteredData, setFilteredData] = useState<Restaurant[]>([]);
    const [idxOfItem, setIdx] = useState<number[]>([])
    const { nameOfRest } = useParams();
    const context = useContext(Data);
    const medianFunc = useContext(FuncMedian);
    
    useEffect(() => {
        if (context && context.apiData) {
            const matchedIndices: number[] = [];
            const filtered = context.apiData.filter((item, index) => {
                const match = item.restauranttype.toLowerCase().includes(nameOfRest?nameOfRest.toLowerCase():'');
                if (match) {
                    matchedIndices.push(index);
                }
                return match;
            });
            setFilteredData(filtered);
            setIdx(matchedIndices);
        }
    }, [context, nameOfRest]);
        
        if (!context) {
          return <p>Loading...</p>;
        }
        if(!medianFunc){
            return null
        }
        
        

    return (
        <section className="cuisinesSection">
        <h2>{nameOfRest&&nameOfRest.toUpperCase()}</h2>
        <div className="cuisinesContainer">

        {filteredData.map((item, idx) => (
            <Card 
                  key={item.id}
                  id={item.id}
                  image={item.image} 
                  businessname={item.businessname} 
                  restauranttype={item.restauranttype} 
                  amountReviews={item.reviews}
                  totalRating={medianFunc.calculateMedianRating(item.reviewsList)}
                  index={idxOfItem[idx]}
                  objRestaurant={item}
              />
        ))}
        </div>
        </section>
      
    );
  }

