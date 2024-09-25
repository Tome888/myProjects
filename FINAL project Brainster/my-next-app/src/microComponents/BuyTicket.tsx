import { useLanguage } from "@/context/LanguageContext";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";

const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};

function BuyTicket() {
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];

  return (
    <div className="linkBuyTicket backupClass">
      <i className="fa-solid fa-link"></i>
      <div>
        <h4>{translations.buyTicket}</h4>
        <p>mhraconference.com</p>
      </div>
    </div>
  );
}

export default BuyTicket;
