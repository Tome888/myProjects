import { Link, } from "react-router-dom";
import { HeartFavorite } from "./HeartFavorite";

interface SimpleCardProps {
    image: string;
    businessname: string;
    restauranttype: string;
    id?: string
    index: number
  }
  
  export const SimpleCard: React.FC<SimpleCardProps> = ({ image, businessname, restauranttype, id, index}) => {
    return (
      <div className="card">
        <Link to={`/restaurant/${id}/${index}`} className="restaurant-link">
        <img className="imageCardTESTT" src={image} alt={businessname} />
        <h3>{businessname}</h3>
        <p>Type: {restauranttype}</p>
        <HeartFavorite CardId={id?id:''} CardIndex={index}/>
      </Link>
      </div>
    );
  }