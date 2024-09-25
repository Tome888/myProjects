import HeroSectionTwo from "@/components/HeroSectionTwo";
import CustomCalendar from "@/microComponents/Calendar";
import WhiteContainerText from "@/microComponents/WhiteContainerText";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card } from "@/microComponents/InfiniteCardScroll";
import { useEffect, useState } from "react";
import EventCatDesc from "@/components/EventCatDesc";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useLanguage } from "@/context/LanguageContext";
import FourCardsSection from "@/components/FourCardsSection";

const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};

function HrCaffee() {
  const { language } = useLanguage();
  const translations = translationsMap[language];
  const router = useRouter();

  const [events, setEvents] = useState<Card[]>([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/events")
      .then((res) => res.json())
      .then((data: Card[]) => setEvents(data));
  }, []);

  return (
    <>
      <Head>
        <title>{translations.pageTitle || "MHRA"}</title>
        <meta
          name="description"
          content={translations.pageDescription || "Events MHRA"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSectionTwo img1="/eventsImg/img1.jpg" img2="/eventsImg/img1.jpg">
        <>
          <WhiteContainerText
            title={translations.heroTitle || "ЧР Кафе"}
            customClass="blogHeroWhiteWrapper"
            text={
              translations.heroText ||
              "Овој четврток кафе на тема како да примените техники и чекори од селф коучинг за подобро да се водите себеси... | 25 Јули, 2024"
            }
            miniTitle={translations.heroMiniTitle || "Настан"}
          />
          <button
            className="buttonAni buton123"
            onClick={() => router.push("/")}
          >
            {translations.buyTicketButton || "Купи карта"}
          </button>
        </>
      </HeroSectionTwo>
      <section className="calendarSection">
        <div className="calendarSecTextWrapper">
          <h2>
            {translations.calendarTitle ||
              "Календар со датуми за сите претстојни настани"}
          </h2>
          <p>
            {translations.calendarDescription ||
              "Погледни ги сите настани распоредени на календар. Со клик на обележаните настани можеш да дознаеш повеќе информации за секој од настаните но за целосни информации упатете се до индивидуалната страна на настанот"}
          </p>
        </div>
        <CustomCalendar arrEvents={events} />
      </section>
      <EventCatDesc titleCat={translations.eventCategoryTitle || "ЧР Кафе"} />

      <section className="showCardsEventsSection">
        <div className="titlePageShowMoreLessWrapper">
          <h3>{translations.upcomingEv}</h3>
        </div>

        <FourCardsSection typeCards={"events"} />
      </section>
    </>
  );
}

export default HrCaffee;
