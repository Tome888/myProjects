import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./Pages/LogIn";
import { useUserLoginContext } from "./context/UserLoginContext";
import PanelHome from "./Pages/PanelHome";
import PageNotFound from "./Pages/PageNotFound";
import NavBar from "./components/NavBar";
import EditIndividual from "./Pages/EditIndividual";
import DelPage from "./Pages/DelPage";
import AddRest from "./Pages/AddRest";

function App() {
  const { tokenData } = useUserLoginContext();

  return (
    <BrowserRouter>
      {tokenData && <NavBar />}
      <Routes>
        <Route path="/" element={<LogIn />} />
        {tokenData && <Route path="/adminPanel" element={<PanelHome />} />}
        {tokenData && (
          <Route path="/adminPanel/:id" element={<EditIndividual />} />
        )}
        {tokenData && <Route path="/delRest" element={<DelPage />} />}
        {tokenData && <Route path="/addRest" element={<AddRest />} />}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
