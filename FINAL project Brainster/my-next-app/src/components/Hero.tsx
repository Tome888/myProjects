import { useRouter } from "next/router";
import HeroSectionTwo from "./HeroSectionTwo";
import WhiteContainerText from "@/microComponents/WhiteContainerText";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useLanguage } from "@/context/LanguageContext";
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function Hero() {
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  const router = useRouter();
  return (
    <HeroSectionTwo
      img1="/genericPhotos/generic1.jpg"
      img2="/genericPhotos/generic2.jpg"
    >
      <>
        <WhiteContainerText
          title={translations.peopleFirstHero}
          text={translations.mahrHero}
        />
        <div className="secondLeftDivMain">
          <h5>{translations.joinUsHero}</h5>
          <button
            onClick={() => router.push("/signLogIn")}
            className="buttonAni"
          >
            {translations.signUp}
          </button>
        </div>
      </>
    </HeroSectionTwo>
  );
}

export default Hero;
