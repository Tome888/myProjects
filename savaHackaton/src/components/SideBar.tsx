import { NavLink } from "react-router-dom";
import logoSava from "../assets/photos/лого 2.png";
import personIcon from "../assets/icons/icon_Person_.png";
import phoneIcon from "../assets/icons/Vector.png";
import shildIcon from "../assets/icons/Vector2.png";
import invoiceIcon from "../assets/icons/Vector3.png";
import invoice2Icon from "../assets/icons/Vector4.png";
import settingsIcon from "../assets/icons/icon_settings2outline_.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export function SideBar() {
  return (
    <div className="sideBarWrapper">
      <NavLink to="/myProfile">
        <img className="logoSideBar" src={logoSava} alt="Logo" />
      </NavLink>
      <ul className="sideBarUl">
        <li>
          <NavLink
            to="/myProfile"
            className={({ isActive }) => (isActive ? "active-class" : "")}
          >
            <img src={personIcon} className="navIcon" alt="" />
            Профил
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/policies"
            className={({ isActive }) => (isActive ? "active-class" : "")}
          >
            <img className="navIcon" src={shildIcon} alt="" />
            Полиси
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/damages"
            className={({ isActive }) => (isActive ? "active-class" : "")}
          >
            <img className="navIcon" src={invoiceIcon} alt="" />
            Штети
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/invoices"
            className={({ isActive }) => (isActive ? "active-class" : "")}
          >
            <img className="navIcon" src={invoice2Icon} alt="" />
            Фактури
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active-class" : "")}
          >
            <img className="navIcon" src={phoneIcon} alt="" />
            Контакт
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active-class" : "")}
          >
            <img className="navIcon" src={settingsIcon} alt="" />
            Поставки
          </NavLink>
        </li>
      </ul>

      <FontAwesomeIcon className="iconBot" icon={faComment} />
      <p className="paragBot">Тука сме да ти помогнеме!</p>
    </div>
  );
}
