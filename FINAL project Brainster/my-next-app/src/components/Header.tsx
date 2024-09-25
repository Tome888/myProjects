import { useAuthContext } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function Header() {
  const { userData, token, setUserData, setToken } = useAuthContext();
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  const [dropDown, setDropDown] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    setUserData(null);
    setToken(null);
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("userData");
    router.push("/");
  };

  const changeLang = (lang: string) => {
    if (lang === "mk") {
      toggleLanguage("en");
    } else {
      toggleLanguage("mk");
    }
  };

  return (
    <header>
      <nav>
        <Link href="/">
          <div className="logo"></div>
        </Link>

        <ul>
          <li
            className="liA"
            onMouseEnter={() => setDropDown("A")}
            onMouseLeave={() => setDropDown("")}
          >
            {translations.greeting}
            <div className={dropDown === "A" ? "visible dropDown" : "dropDown"}>
              <ul>
                <li onClick={() => router.push("/about")}>
                  {translations.about}
                </li>
                <li>{translations.membership}</li>
                <li>{translations.branch}</li>
                <li>{translations.jobAds}</li>
                <li>{translations.hrAwards}</li>
                <li>{translations.eNewsletter}</li>
                <li>{translations.archive}</li>
                <li>{translations.faq}</li>
              </ul>
            </div>
          </li>
          <li
            className="liB"
            onMouseEnter={() => setDropDown("B")}
            onMouseLeave={() => setDropDown("")}
          >
            {translations.educationalContent}
            <div className={dropDown === "B" ? "visible dropDown" : "dropDown"}>
              <ul>
                <li>{translations.articles}</li>
                <li>{translations.research}</li>
                <li>{translations.interviews}</li>
                <li>{translations.training}</li>
                <li>{translations.academies}</li>
                <li>{translations.projects}</li>
                <li>{translations.experts}</li>
                <li>{translations.trends}</li>
              </ul>
            </div>
          </li>

          <Link className="liC" href={"/yearlyConference"}>
            {translations.yearlyConference}
          </Link>

          <li
            className="liD"
            onMouseEnter={() => setDropDown("D")}
            onMouseLeave={() => setDropDown("")}
          >
            <Link href={"/events"}>{translations.events}</Link>
            <div
              className={
                dropDown === "D" ? "visible dropDown hrDrop" : "dropDown hrDrop"
              }
            >
              <ul>
                <li onClick={() => router.push("/events/hrcaffee")}>
                  {translations.hrCaffee}
                </li>
                <li onClick={() => router.push("/events/hrweekend")}>
                  {translations.hrWeekend}
                </li>
                <li onClick={() => router.push("/events/hrwebinar")}>
                  {translations.hrWebinar}
                </li>
                <li onClick={() => router.push("/events/hrconferences")}>
                  {translations.hrConferences}
                </li>
              </ul>
            </div>
          </li>

          <li
            className="liE"
            onMouseEnter={() => setDropDown("E")}
            onMouseLeave={() => setDropDown("")}
          >
            <Link href={"/blog"}>{translations.blog}</Link>
          </li>
          <li
            className="liF"
            onMouseEnter={() => setDropDown("F")}
            onMouseLeave={() => setDropDown("")}
          >
            <i className="fa-solid fa-magnifying-glass navSearchI"></i>
            <div className={dropDown === "F" ? "visible dropDown" : "dropDown"}>
              <form className="searchInputNav">
                <input
                  type="text"
                  placeholder={translations.searchPlaceholder}
                />
              </form>
            </div>
          </li>
        </ul>

        <div className="btnsWrapper">
          <div className="firstDivBtnsWrapper">
            <i className="fa-regular fa-bell"></i>
          </div>

          <div className="langDiv" onClick={() => changeLang(language)}>
            <p
              style={{
                textDecoration: language === "mk" ? "underline" : "none",
              }}
            >
              MK
            </p>
            /
            <p
              style={{
                textDecoration: language === "en" ? "underline" : "none",
              }}
            >
              EN
            </p>
          </div>

          <div className="zacleniSeDiv">
            {userData && token ? (
              <>
                <img
                  className="pfpLoggedIn"
                  src="/pfps/anon.png"
                  alt=""
                  onClick={() => router.push("/userDashboard")}
                />
                <button
                  className="buttonAni logOutButton"
                  onClick={handleLogout}
                >
                  {translations.logOut}
                </button>
              </>
            ) : (
              <button
                className="buttonAni"
                onClick={() => router.push("/signLogIn")}
              >
                {translations.signUp}
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
