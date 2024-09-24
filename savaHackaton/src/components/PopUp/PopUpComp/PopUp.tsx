import { Dialog } from "@mui/material";
import React, { useState } from "react";
import PopUpZapocni from "../PopUpZapocni/PopUpZapocni";
import PopUpTelefon from "../PopUpTelefon/PopUpTelefon";
import PopUpAuth from "../PopUpAuth/PopUpAuth";
import PopUpCongrats from "../PopUpCongrats/PopUpCongrats";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  const [currentPopUp, setCurrentPopUp] = useState<
    "Zapocni" | "Telefon" | "Auth" | "Congrats"
  >("Zapocni");

  const handleNextPopUp = (
    nextPopUp: "Telefon" | "Auth" | "Congrats"
  ) => {
    setCurrentPopUp(nextPopUp);
  };

  const handleNavigateToProfile = () => {
    window.location.pathname = "/myProfile";
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "50px",
          width: "50%",
          height: "70%",
          overflow: "hidden",
          padding: "6rem",
        },
      }}
    >
      {currentPopUp === "Zapocni" && (
        <PopUpZapocni onNext={() => handleNextPopUp("Telefon")} />
      )}
      {currentPopUp === "Telefon" && (
        <PopUpTelefon onNext={() => handleNextPopUp("Auth")} />
      )}
      {currentPopUp === "Auth" && (
        <PopUpAuth onNext={() => handleNextPopUp("Congrats")} />
      )}
      {currentPopUp === "Congrats" && (
        <PopUpCongrats onNavigateToProfile={handleNavigateToProfile} />
      )}
    </Dialog>
  );
};

export default PopUp;
