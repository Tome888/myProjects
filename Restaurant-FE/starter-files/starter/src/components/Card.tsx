import { Link, useLocation, } from "react-router-dom";
import { HeartFavorite } from "./HeartFavorite";

interface CardProps {
    image: string;
    businessname: string;
    restauranttype: string;
    amountReviews: number;
    totalRating?: number
    id?: string
    index: number
    objRestaurant?: any
  }
  
  export const Card: React.FC<CardProps> = ({ image, businessname, restauranttype, amountReviews, totalRating, id, index}) => {
    
    const isFavorites = useLocation()

    return (
      <div className="card">
          <Link to={`/restaurant/${id}/${index}`} className="restaurant-link" style={{ width: isFavorites.pathname === '/favorites' ? '100%' : '' }}>
              <img style={{ width: isFavorites.pathname === '/favorites' ? '100%' : '',objectFit: isFavorites.pathname === '/favorites' ? 'cover' : 'initial' }} className="imageCard" src={image} alt={businessname} />
              <h3>{businessname}</h3>
              <p className="typeCard">{restauranttype}</p>
              {totalRating! > 0 && (
                  <>
                    <p>Rating - {isNaN(totalRating!) ? 0 : totalRating}</p>
                    <p>Based on {amountReviews} reviews</p>
                  </>
              )}
              <HeartFavorite CardId={id ? id : ''} CardIndex={index} />
          </Link>
      </div>
  );
  }