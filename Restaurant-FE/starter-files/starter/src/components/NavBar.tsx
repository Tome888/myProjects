import { NavLink } from "react-router-dom";
import { FavoritesArray } from "../context/FavoritesContext";
import { useContext } from "react";
import { Restaurant } from "../context/ApiContext";

export function NavBar(){
    const FavoriteContext = useContext(FavoritesArray)
    if(!FavoriteContext){
        return null
    }
    const emptyfavoritesIcon = (arr: Restaurant[]| undefined)=>{
        if(arr){
            if(arr.length>0){
                return <i style={{color: '#FF6247'}} className="fa-solid fa-heart fa-2x"></i>
            }else{
                return<i style={{color: '#FF6247'}} className="fa-regular fa-heart fa-2x"></i>
            }
        }
    }
    return(
        <nav>
            <NavLink to={'/'}>
            <p style={{color: 'black'}}>RESTAURANT</p>
            </NavLink>
            <NavLink to={'/favorites'}>
            {
                emptyfavoritesIcon(FavoriteContext.favArr)
            }
            </NavLink>
        </nav>
    )
}