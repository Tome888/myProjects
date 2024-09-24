import { useState } from "react";
import PhoneInput from 'react-phone-number-input';
import "react-phone-number-input/style.css";
import "./popuptelefon.css";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faCircleCheck, faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface PopUpTelefonProps {
  onNext: () => void;
}
const PopUpTelefon: React.FC<PopUpTelefonProps> = ({ onNext }) => {
  const [phoneValue, setPhoneValue] = useState<string | undefined>();

  const handleNext = () => {
    onNext();
  };
  return (
    <div className='telefon'>
        <h4>Поставување на вашиот телефон</h4>
        <div className="content">

      <label className="labelPhone" htmlFor="phoneNum">Внесете го вашиот телефонски број</label>
      <PhoneInput
      value={phoneValue}
      defaultCountry="MK"
      onChange={setPhoneValue}
      className="phoneInput"
      international
      />
      <p>Селектирај која било опција за да добиете код</p>
      <Button className="buttonTel mg-bt" fullWidth variant="outlined">
        <div className="buttonTelContent">
            <div><FontAwesomeIcon className="phoneIcons fb-20" icon={faEnvelope}/></div>
            <div className="content-items fb-80"><h5>Е-маил</h5><p>Примање код преку мејл</p></div>
        </div></Button>
      <Button className="buttonTel" fullWidth variant="outlined">
        <div className="buttonTelContent">
            <div><FontAwesomeIcon className="phoneIcons" icon={faPhoneVolume}/></div>
            <div className="content-items"><h5>Телефонски повик</h5><p>Добиен код преку телефонски повик</p></div>
        </div>
      </Button>

      </div>
      <FontAwesomeIcon className="iconCheck" icon={faCircleCheck} onClick={handleNext} />
    </div>
  );
};

export default PopUpTelefon;
