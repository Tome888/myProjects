import { Link } from "react-router-dom";
import backIcon from "../assets/icons/image.png";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NavBar() {
  return (
    <nav>
      <Link to={"/"}>
        <img className="iconBack" src={backIcon} alt="" />
        <FontAwesomeIcon className="leftIcon" icon={faChevronLeft} />
      </Link>
    </nav>
  );
}
