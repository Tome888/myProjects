import { useState } from "react";
import { useRestArrContext } from "../context/RestArrContext";
import { useUserLoginContext } from "../context/UserLoginContext";

interface RestDelCardsProps {
  imgLink: string;
  nameRest: string;
  cat: string;
  idCard: string;
}

function DelCards({ imgLink, nameRest, cat, idCard }: RestDelCardsProps) {
  const { tokenData } = useUserLoginContext();
  const { toggle, setToggle } = useRestArrContext();

  const [show, setShow] = useState(false);
  const delRestFunc = (cardId: string) => {
    fetch(`http://localhost:5000/deleteRest/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${tokenData}`,
        "api-key": "86dg6qwd6g7878g0D68G97y9SF8Y9-sfgy8AD",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete restaurant");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        setToggle(!toggle);
      })
      .catch((error) => {
        console.error("Error deleting restaurant:", error);
      });
  };

  return (
    <>
      <div className="restCardWrapper delCards">
        <img src={imgLink} alt={nameRest} />
        <h3>{nameRest}</h3>
        <p>{cat}</p>

        <button onClick={() => setShow(!show)}>Delete</button>
      </div>

      {show && (
        <div className="blurWrapper">
          <div className="blurBackground"></div>

          <div className="contentsHolder">
            <h3>Are you sure?</h3>
            <div>
              <button
                onClick={() => {
                  delRestFunc(idCard);
                  setShow(!show);
                }}
              >
                Yes
              </button>
              <button onClick={() => setShow(!show)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DelCards;
