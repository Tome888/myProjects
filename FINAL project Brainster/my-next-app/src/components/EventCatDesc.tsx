import { useLanguage } from "@/context/LanguageContext";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";

interface EventCatDescProps {
  titleCat: string;
}

const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};

function EventCatDesc({ titleCat }: EventCatDescProps) {
  const { language } = useLanguage();
  const translations = translationsMap[language];

  return (
    <section className="lSection">
      <div className="div1">
        <h2>{titleCat}</h2>
        <p>
          {translations.description1 ||
            "Специјализиран настан наменет за професионалци од областа на човечки ресурси (HR), каде што учесниците ќе имаат можност да се сретнат, да разменат искуства и идеи, како и да научат нови вештини и трендови во оваа динамична област. Овој настан се одржува во пријатна и неформална атмосфера, со цел да поттикне отворена дискусија и вмрежување помеѓу присутните."}
        </p>
      </div>
      <div>
        <div className="div2">
          <div className="div3">
            <img src="/genericPhotos/generic3.jpg" alt="" />
            <div className="ulWrapper00">
              <h3>
                {translations.eventIncludesTitle || "Настанот ќе вклучува:"}
              </h3>
              <ul>
                <li>
                  {translations.interactiveLectures ||
                    "Интерактивни предавања од искусни HR професионалци"}
                </li>
                <li>
                  {translations.panelDiscussions ||
                    "Панел дискусии на актуелни теми во областа на човечките ресурси"}
                </li>
                <li>
                  {translations.workshops ||
                    "Работилници за развој на практични вештини"}
                </li>
                <li>
                  {translations.networkingOpportunities ||
                    "Можности за вмрежување и споделување на најдобри практики"}
                </li>
                <li>
                  {translations.coffeeAndCasualTalks ||
                    "Кафе и неформални разговори во релаксирана атмосфера"}
                </li>
              </ul>
            </div>
          </div>
          <p className="lastTextL">
            {translations.callToAction ||
              `Oдлична можност за сите кои работат во HR секторот или се заинтересирани за оваа област, да го прошират своето знаење, да создадат нови професионални врски и да придонесат за унапредување на човечките ресурси во нивните организации. Придружете ни се за инспиративен и корисен ден исполнет со учење и вмрежување!`}
          </p>
          <div className="lastDiv">
            <img
              className="lastDivFirstImg"
              src="/genericPhotos/generic4.jpg"
              alt=""
            />
            <img
              className="lastDivSecondImg"
              src="/genericPhotos/generic5.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="secondLeftDivMain lDivbutton">
        <p>{translations.buyTicketText || "Купи карта за следниот настан!"}</p>
        <button className="buttonAni">
          {translations.buyTicketButton1 || "Купи карта"}
        </button>
      </div>
    </section>
  );
}

export default EventCatDesc;
