import Calendar from "react-calendar";
import ring from "../assets/photos/ring.png";
import hand from "../assets/photos/2211.w018.n002.1418A.p30.1418-removebg-preview 1.png";
import backArrow from "../assets/photos/162639-OVHHFQ-781-removebg-preview 1.png";
import cancelIcon from "../assets/photos/cancel-icon-right-side-white-background-removebg-preview 1.png";
import masterCrd from "../assets/icons/logos_mastercard.png";
import visa from "../assets/icons/Vector123123.png";
import { CustomCalendar } from "./CustomCalendar";

export function CalendarDiv() {
  // const activeDate = new Date(2024, 5, 30);

  // const tileClassName = ({ date, view }: { date: Date; view: string }) => {
  //   if (
  //     view === "month" &&
  //     date.getDate() === activeDate.getDate() &&
  //     date.getMonth() === activeDate.getMonth() &&
  //     date.getFullYear() === activeDate.getFullYear()
  //   ) {
  //     return "activeDate";
  //   }
  //   return null;
  // };

  return (
    <div className="wrapperCalendarDiv">
      <div className="sixPack">
        <div className="pack">
          <img src={ring} alt="" />
          <div>
            <p className="numberr">2</p>
            <p className="textt">Активни полиси</p>
          </div>
        </div>
        <div className="pack">
          <img src={hand} alt="" />
          <div className="wrapperTitles wrapperNot">
            <p className="numberrNot">30 Јуни</p>
            <p className="textt">Активни полиси</p>
          </div>
        </div>
        <div className="pack">
          <img src={ring} alt="" />
          <div className="wrapperTitles">
            <p className="numberr">0</p>
            <p className="textt">Пријавени штети</p>
          </div>
        </div>
        <div className="pack">
          <img src={backArrow} alt="" />
          <div className="wrapperTitles wrapperNot">
            <p className="numberrNot">PO-12345678</p>
            <p className="textt">Полиса за плаќање</p>
          </div>
        </div>
        <div className="pack">
          <img src={ring} alt="" />
          <div className="wrapperTitles">
            <p className="numberr">1</p>
            <p className="textt">Активни договори</p>
          </div>
        </div>
        <div className="pack">
          <img src={cancelIcon} alt="" />
          <div className="wrapperTitles wrapperNot">
            <p className="numberrNot">0.00 ден</p>
            <p className="textt">Исплатени штети</p>
          </div>
        </div>
      </div>
      <div className="cardInfoDiv">
        <img src={masterCrd} alt="" />
        <p>**** **** **** 1234</p>
        <p>06/2024</p>
        <p className="underline">Примарна</p>
      </div>
      <div className="cardInfoDiv">
        <img src={visa} alt="" />
        <p>**** **** **** 1234</p>
        <p>06/2024</p>
        <p className="underline">Секундарна</p>
      </div>

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider> */}
      <div className="calendarDiv">
        {/* <Calendar tileClassName={tileClassName} /> */}
        <CustomCalendar/>
      </div>
    </div>
  );
}
