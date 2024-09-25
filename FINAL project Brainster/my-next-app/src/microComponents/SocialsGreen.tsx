import { useLanguage } from "@/context/LanguageContext";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";

interface SocialGreenProps {
  customClass?: string;
}
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function SocialsGreen({ customClass }: SocialGreenProps) {
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  return (
    <div className={`firstRightDivMain ${customClass}`}>
      <p className="firstRightDivMainP">{translations.followUsSocials}</p>
      <div className="faWrapper">
        <i className="fa-brands fa-linkedin"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-square-facebook"></i>
        <i className="fa-brands fa-square-youtube"></i>
      </div>
    </div>
  );
}

export default SocialsGreen;
