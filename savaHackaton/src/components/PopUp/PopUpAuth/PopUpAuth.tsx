import { useState, useEffect } from 'react';
import "./popupauth.css";
import ReactInputVerificationCode from 'react-input-verification-code';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
interface PopUpTelefonProps {
  onNext: () => void;
}
const PopUpAuth: React.FC<PopUpTelefonProps> = ({ onNext }) => {
  const [seconds, setSeconds] = useState(60);
  const [error, setError] = useState('');
  const [codeType, setCodeType] = useState<"password" | "text">("password");
  const handleNext = () => {
    onNext(); 
  };
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setError('Кодот е истечен');
    }
  }, [seconds]);

  const handleCodeVisibility = () => {
    setCodeType(codeType === "password" ? "text" : "password");
  };

  return (
    <div className="popup-auth">
      <h4 className=' mg-bt-2'>Здраво, Емилија</h4>
      <p className='mg-bt-2'>Потребна е автентикација за пристап до вашата сметка!</p>
      <div className="timer mg-bt-2">
        {seconds > 0 ? (
          <p>Време преостанато: {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}</p>
        ) : (
          <p className="error">{error}</p>
        )}
      </div>
      <div>
        <ReactInputVerificationCode
          length={6}
          placeholder=""
          type={codeType}
          passwordMask="*"
        />
        <p className="mg-bt-2 seePw" onClick={handleCodeVisibility}>
          {codeType === "password" ? (
            <>
              <FontAwesomeIcon icon={faEye} />
              Види код
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faEyeSlash} />
              Сокриј код
            </>
          )}
        </p>
        <FontAwesomeIcon className="iconCheck" icon={faCircleCheck} onClick={handleNext}/>
        <p className='authHelp'>Дали ви е потребна помош?</p>
      </div>
    </div>
  );
}

export default PopUpAuth;
