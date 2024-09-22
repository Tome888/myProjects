import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserLoginContext } from "../context/UserLoginContext";
import { useRestArrContext } from "../context/RestArrContext";
import RestCards from "../components/RestCards";

function PanelHome() {
  const { tokenData } = useUserLoginContext();
  const navigate = useNavigate();
  const { arrRest, toggle, setToggle } = useRestArrContext();
  const [filtArr, setFiltArr] = useState("all");

  useEffect(() => {
    if (!tokenData) {
      navigate("/");
    }
  }, [navigate, tokenData]);

  const buttons = [
    "all",
    "canteen",
    "bukka",
    "seafood",
    "pizza",
    "vegan",
    "pasta",
    "eatery",
    "american",
    "japanese",
  ];

  return (
    <section>
      <h2>Edit Panel</h2>

      <div className="btnsWrapperFilter">
        {buttons.map((btnName, idx) => {
          return (
            <button
              onClick={() => setFiltArr(btnName)}
              key={idx}
              className={filtArr === btnName ? "activeBtnFilter" : ""}
            >
              {btnName}
            </button>
          );
        })}
      </div>
      <div className="cardsWrapper">
        {filtArr === "all" &&
          arrRest.map((rest) => {
            return (
              <Link to={`/adminPanel/${rest.id}`} key={rest.id}>
                <RestCards
                  imgLink={rest.image}
                  nameRest={rest.businessname}
                  cat={rest.restauranttype}
                  key={rest.id}
                />
              </Link>
            );
          })}
        {filtArr !== "all" &&
          arrRest.map(
            (rest) =>
              rest.restauranttype === filtArr && (
                <Link to={`/adminPanel/${rest.id}`} key={rest.id}>
                  <RestCards
                    imgLink={rest.image}
                    nameRest={rest.businessname}
                    cat={rest.restauranttype}
                    key={rest.id}
                  />
                </Link>
              )
          )}
      </div>
    </section>
  );
}

export default PanelHome;
