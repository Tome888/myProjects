import { useNavigate } from "react-router-dom";
import { useUserLoginContext } from "../context/UserLoginContext";
import { useRestArrContext } from "../context/RestArrContext";
import { useEffect, useState } from "react";
import DelCards from "../components/DelCards";

function DelPage() {
  const { tokenData } = useUserLoginContext();
  const navigate = useNavigate();
  const { arrRest } = useRestArrContext();
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
      <h2>Delete Panel</h2>

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
              <DelCards
                imgLink={rest.image}
                nameRest={rest.businessname}
                cat={rest.restauranttype}
                key={rest.id}
                idCard={rest.id}
              />
            );
          })}
        {filtArr !== "all" &&
          arrRest.map(
            (rest) =>
              rest.restauranttype === filtArr && (
                <DelCards
                  imgLink={rest.image}
                  nameRest={rest.businessname}
                  cat={rest.restauranttype}
                  key={rest.id}
                  idCard={rest.id}
                />
              )
          )}
      </div>
    </section>
  );
}

export default DelPage;
