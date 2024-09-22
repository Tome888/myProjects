
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApiContext } from "./context/ApiContext";
import { NavBar } from "./components/NavBar";
import { FavoritesPage } from "./pages/FavoritesPage";
import { Home } from "./pages/Home";

import { Footer } from "./components/Footer";
import { IndividualRestaurant } from "./pages/IndividualRestaurant";
import { GetRandomRest } from "./context/ContextRandom";
import { CuisinesPage } from "./pages/CuisinesPage";
import { FavoritesContext } from "./context/FavoritesContext";
import { MedianFunction } from "./context/MedianContext";

const App = () => {
  return(
  <ApiContext>
    <MedianFunction>
    <FavoritesContext>
    <GetRandomRest>
   <BrowserRouter>
    <NavBar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/favorites" element={<FavoritesPage/>}/>
    <Route path="/restaurant/:nameOfRest/:indx" element={<IndividualRestaurant/>}/>
    <Route path="/cuisinesPage/:nameOfRest" element={<CuisinesPage/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
    </GetRandomRest>
    </FavoritesContext>
    </MedianFunction>
  </ApiContext>
  )
};

export default App;
