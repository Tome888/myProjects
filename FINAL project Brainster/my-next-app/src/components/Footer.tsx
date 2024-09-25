import { useLanguage } from "@/context/LanguageContext";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useState } from "react";
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};

function Footer() {
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setPopup(true);
        setEmail("");
      } else {
        alert("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <footer>
      <div className="footerWrapper">
        <div
          className={popup ? "subPopupContainer" : "subPopupContainer dNone"}
        >
          <h3>{translations.popupNoti}</h3>
          <button onClick={() => setPopup(false)}>
            {translations.btnPopup}
          </button>
        </div>
        <div className="firstWrapperFooter">
          <div className="logo"></div>
          <form onSubmit={handleSubmit}>
            <label>{translations.subFooter}</label>
            <input
              type="email"
              placeholder="Е-маил"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="footerInpSub"
            />
            <button className="buttonAni" type="submit">
              {translations.subFooter2}
            </button>
          </form>
        </div>
        <div className="secondWrapperFooter">
          <div>
            <div>
              <h3>{translations.adressFooter}</h3>
              <p>Бул. ВМРО бр.7/1-7</p>
              <p>1000 Скопје, Македонија</p>
            </div>
            <div>
              <h3>{translations.emailFooter}</h3>
              <p>contact@mhra.mk</p>
            </div>
          </div>
          <div>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-square-facebook"></i>
            <i className="fa-brands fa-square-youtube"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
