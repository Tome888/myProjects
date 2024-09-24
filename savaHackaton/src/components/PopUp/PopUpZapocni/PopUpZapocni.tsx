import { Button } from '@mui/material';
import './popupzapocni.css'

interface PopUpZapocniProps {
  onNext: () => void;
}

const PopUpZapocni: React.FC<PopUpZapocniProps> = ({ onNext }) => {
  const handleStart = () => {
   
    onNext();
  };

  return (
    <div className='zapocni'>
      <h4>Рационализирајте го процесот на најавување со СМС код за автентикација!</h4>
      <img src="/images/SavaPhone.png" alt="SavaPhone" />
      <p>Секогаш кога ќе се најавите, ќе користите лозинка и СМС код за потврда.</p>
      <Button className='submitBtn' variant="outlined" onClick={handleStart}>Започни</Button>
    </div>
  );
}

export default PopUpZapocni;
