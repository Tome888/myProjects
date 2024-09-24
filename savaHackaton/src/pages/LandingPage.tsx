import { Link } from "react-router-dom";
import backIcon from "../assets/icons/image.png";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import phoneImg from "../assets/photos/phone2.png";
export function LandingPage() {
  return (
    <section className="landingPageOne">
      <nav>
        <Link to={"/"}>
          <img className="iconBack" src={backIcon} alt="" />
          <FontAwesomeIcon className="leftIcon" icon={faChevronLeft} />
        </Link>
      </nav>
      <div className="landingWrapper">
        <div className="linkWrapper">
          <h1>
            Сигурност со <span> клик !</span>{" "}
          </h1>
          <div className="wrapperBtns">
            <Link to={"/signIn"}>
              <div className="landingPageBtn">Најави се</div>
            </Link>
            <Link to={"/register"}>
              <div className="landingPageBtn">Регистрирај се</div>
            </Link>
          </div>
        </div>
        <div className="phoneImgOne">
          <img src={phoneImg} alt="" />
        </div>
      </div>
    </section>
  );
}
