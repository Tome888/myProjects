import { useLanguage } from "@/context/LanguageContext";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";

interface EventDescProp {
  title: string;
  text: string;
}
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function EventsDescriptionSection({ title, text }: EventDescProp) {
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  return (
    <section>
      <div className="eventHeadingWrapper">
        <h2>{title}</h2>
        <p>
          {translations.topic}: ,,{text}"
        </p>
      </div>
      <div className="eventDescWrapper">
        <img src="/grDots.png" alt="" className="dotGrComm" />
        <div className="descriptionHolderDiv">
          <div>
            <h2>{translations.description2}:</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              repellendus explicabo numquam dicta minus illum quas voluptatum
              harum quidem ipsa placeat architecto nam maiores quam veritatis,
              iure debitis! At, placeat. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Aperiam repellendus explicabo numquam dicta
              minus illum quas voluptatum harum quidem ipsa placeat architecto
              nam maiores quam veritatis, iure debitis! At, placeat.
            </p>
          </div>
          <div>
            <h2>{translations.purpose}:</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              repellendus explicabo numquam dicta minus illum quas voluptatum
              harum quidem ipsa placeat architecto nam maiores quam veritatis,
              iure debitis! At, placeat.
            </p>
          </div>
        </div>
        <img
          className="eventDescWrapperImg"
          src={`/genericPhotos/generic${Math.floor(Math.random() * 4) + 1}.jpg`}
          alt=""
        />
      </div>
    </section>
  );
}
export default EventsDescriptionSection;
