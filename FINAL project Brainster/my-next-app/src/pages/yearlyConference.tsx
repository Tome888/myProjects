import AgendaConf from "@/components/AgendaConf";
import FourCardsSection from "@/components/FourCardsSection";
import HeroSectionOne from "@/components/HeroSectionOne";
import { useLanguage } from "@/context/LanguageContext";
import BreadCrumbs from "@/microComponents/BreadCrumbs";
import BuyTicket from "@/microComponents/BuyTicket";
import InfiniteCardScroll from "@/microComponents/InfiniteCardScroll";
import PacketsCard from "@/microComponents/PacketsCard";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import Head from "next/head";
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function YearlyConference() {
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  const personalArr = ["1 седиште", "Пауза за ручек", "WiFi"];
  const corpArr = [
    "20 седишта",
    "Паузи за чај и кафе",
    "Пауза за ручек",
    "WiFi",
  ];

  return (
    <>
      <Head>
        <title>MHRA</title>
        <meta name="description" content="Conference MHRA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSectionOne
        img={"/genericPhotos/croud.png"}
        smallTitle={translations.heroSectionOneSmallTitle}
        title={translations.heroSectionOneTitle}
        smallTitleTwo={translations.heroSectionOneSmallTitleTwo}
      />
      <InfiniteCardScroll />
      <BreadCrumbs />

      <section className="ConfFirst">
        <div className="leftConfFirst">
          <h2>{translations.heroSectionOneTitle}</h2>
          <div className="detailsConf">
            <div>
              <i className="fa-solid fa-calendar-days"></i>
              <p>{translations.confFirstDate}</p>
            </div>
            <div>
              <i className="fa-solid fa-location-pin"></i>
              <p>{translations.confFirstLocation}</p>
            </div>
          </div>

          <p>{translations.confFirstDescription}</p>

          <BuyTicket />
        </div>
        <div className="rightConfFirst">
          <img
            className="bigPicConf"
            src="/genericPhotos/generic9.jpg"
            alt=""
          />
          <div className="bubbleConfDiv firstBubble">
            <img src="/genericPhotos/generic8.jpg" alt="" />
          </div>
          <div className="bubbleConfDiv secondBubble">
            <img src="/genericPhotos/generic6.jpg" alt="" />
          </div>
        </div>
      </section>

      <section className="ConfSecond">
        <img src="/grDots.png" alt="" className="dotGrComm" />
        <div className="ConfSecondWhiteContainer">
          <div>
            <i className="fa-regular fa-calendar-days"></i>
            <div>
              <h3>2</h3>
              <p>{translations.confSecondDayText}</p>
            </div>
          </div>
          <div>
            <i className="fa-regular fa-user"></i>

            <div>
              <h3>9</h3>
              <p>{translations.confSecondSpeakerText}</p>
            </div>
          </div>
          <div>
            <i className="fa-solid fa-mug-saucer"></i>
            <div>
              <h3>6</h3>
              <p>{translations.confSecondRestaurantText}</p>
            </div>
          </div>
          <div>
            <i className="fa-solid fa-book"></i>

            <div>
              <h3>28</h3>
              <p>{translations.confSecondBookText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ConfThird">
        <img src="/grDots.png" alt="" className="dotGrComm" />
        <h2>{translations.confThirdSpecialGuests}</h2>
        <p>{translations.confThirdSpecialGuestsDescription}</p>

        <div className="personWrapperConf">
          <div>
            <img
              className="firstTwoPhotos"
              src="/genericPhotos/generic9.jpg"
              alt=""
            />
            <div className="linkBuyTicket firstLink imDone">
              <i className="fa-brands fa-linkedin linkedinLink"></i>
              <div>
                <h4>{translations.quoteSectionPersonName}</h4>
                <p>{translations.quoteSectionPersonTitle}</p>
              </div>
            </div>
          </div>
          <div>
            <img className="firstTwoPhotos" src="/pfps/pfp2.jpg" alt="" />
            <div className="linkBuyTicket secondLink imDone">
              <div>
                <h4>{translations.olivia}</h4>
                <p>{translations.oliviaCeo}</p>
              </div>
              <i className="fa-brands fa-linkedin linkedinLink"></i>
            </div>
          </div>
          <div>
            <img className="lastTwoPhotos" src="/pfps/pfp3.jpg" alt="" />
            <div className="linkBuyTicket thirdLink imDone">
              <i className="fa-brands fa-linkedin linkedinLink"></i>
              <div>
                <h4>{translations.james}</h4>
                <p>{translations.jamesCeo}</p>
              </div>
            </div>
          </div>
          <div>
            <img
              className="lastTwoPhotos"
              src="/genericPhotos/generic3.jpg"
              alt=""
            />
            <div className="linkBuyTicket forthLink imDone">
              <div>
                <h4>{translations.ednaMode}</h4>
                <p>{translations.ednaModeJOB}</p>
              </div>
              <i className="fa-brands fa-linkedin linkedinLink"></i>
            </div>
          </div>
        </div>
        <button className="buttonAni">{translations.confThirdButton}</button>
      </section>
      <AgendaConf />

      <section className="quoteSection">
        <img src="/grDots.png" alt="" className="dotGrComm" />
        <div className="quoteSectionLeft">
          <img src="/genericPhotos/generic9.jpg" alt="" />
          <i className="fa-solid fa-quote-right"></i>
        </div>
        <div className="quoteSectionRight">
          <h2>{translations.quoteSectionPersonName}</h2>

          <p>{translations.quoteSectionPersonTitle}</p>
          <p className="paraASD">{translations.quoteSectionQuote}</p>
        </div>
      </section>

      <section className="packetSection">
        <h2>{translations.packetSectionTitle}</h2>
        <div>
          <PacketsCard
            type={translations.packetSectionIndividual}
            money={translations.packetSectionIndividualPrice}
            benefits={personalArr}
          />
          <PacketsCard
            type={translations.packetSectionCorporate}
            money={translations.packetSectionCorporatePrice}
            benefits={corpArr}
          />
        </div>
        <button className="buttonAni">
          {translations.packetSectionButton}
        </button>
      </section>

      <section className="mapSection">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4193.32150685164!2d21.450219269038495!3d41.997569783012935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135415986f9f2cd7%3A0x61669f4d3a9aa58c!2sHotel%20Continental!5e0!3m2!1sen!2smk!4v1724686952664!5m2!1sen!2smk"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Embed"
          className="theMap"
        ></iframe>
        <button className="buttonAni mapBtn">
          {translations.mapSectionDirectionsButton}
        </button>
      </section>

      <section>
        <h2>{translations.latestBlogs}</h2>
        <FourCardsSection typeCards={"blogs"} />
      </section>

      <section>
        <h2>{translations.latestEvents}</h2>
        <FourCardsSection typeCards={"events"} />
      </section>
    </>
  );
}

export default YearlyConference;
