import { useEffect, useState } from "react";
import { CalendarDiv } from "../components/CalendarRight";
import { ChartComponent } from "../components/ChartComponent";
import PopUpSuccess from "../components/PopUp/PopUpSuccess/PopUpSuccess";
import { useLocation } from "react-router-dom";

export function MyProfile() {
  const location = useLocation();
  const showPopup = location.state?.showPopup || false;
  const [isPopupVisible, setIsPopupVisible] = useState(showPopup);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setIsPopupVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);
  return (
    <div className="myProfileMainDiv">
      {isPopupVisible && <PopUpSuccess />}
      <ChartComponent />
      <CalendarDiv />
    </div>
  );
}
