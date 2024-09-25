import AgendaConf from "@/components/AgendaConf";
import EventsDescriptionSection from "@/components/EventsDescriptionSection";
import FourCardsSection from "@/components/FourCardsSection";
import HeroSectionOne from "@/components/HeroSectionOne";
import PresentersConf from "@/components/PresentersConf";
import { useLanguage } from "@/context/LanguageContext";
import BreadCrumbs from "@/microComponents/BreadCrumbs";
import BuyTicket from "@/microComponents/BuyTicket";
import InfiniteCardScroll from "@/microComponents/InfiniteCardScroll";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export interface EventArticleProps {
  id: any;
  title: string;
  text: string;
  img: string;
  category: string;
  day: number;
  month: number;
  year: number;
}
const months: Record<"mk" | "en", string[]> = {
  mk: [
    "Јануари",
    "Февруари",
    "Март",
    "Април",
    "Мај",
    "Јуни",
    "Јули",
    "Август",
    "Септември",
    "Октомври",
    "Ноември",
    "Декември",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function EventArticle() {
  const [eventData, setEventData] = useState<EventArticleProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;

    fetch(`http://localhost:5001/api/events?id=${router.query.id}`)
      .then((res) => res.json())
      .then((data: EventArticleProps[]) => {
        if (data.length > 0) {
          setEventData(data[0]);
        } else {
          setEventData(null);
        }
      })
      .catch((error) => {
        setEventData(null);
        console.error(error);
      });
  }, [router.query.id]);
  const { language } = useLanguage();

  const currentLanguage = language as "mk" | "en";

  const currentMonths = months[currentLanguage];
  const translations = translationsMap[language];

  return eventData ? (
    <>
      <Head>
        <title>MHRA</title>
        <meta name="description" content="Event MHRA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSectionOne
        img={`/eventsImg/${eventData.img}`}
        smallTitle={translations.heroSectionOneSmallTitle}
        title={eventData.category}
        smallTitleTwo={`${eventData.day} ${
          currentMonths[eventData.month - 1]
        } ${eventData.year}`}
      />
      <InfiniteCardScroll />
      <BreadCrumbs />

      <EventsDescriptionSection
        title={eventData.category}
        text={eventData.text}
      />
      <AgendaConf />
      <PresentersConf />

      <section className="section999">
        <div>
          <div>
            <h3>{translations.pForp}</h3>
            <h3>{translations.pricePmkd}</h3>
          </div>
          <div>
            <h3>{translations.pForC}</h3>
            <h3>{translations.priceCmkd}</h3>
          </div>
        </div>
        <div
          style={{ background: "url('/genericPhotos/croud.png')" }}
          className="bgDivEventId"
        >
          <BuyTicket />
          <button className="buttonAni">{translations.shareToFriend}</button>
        </div>
      </section>
      <section>
        <h2>{translations.similarEvents}</h2>
        <FourCardsSection typeCards={"events"} />
      </section>
    </>
  ) : (
    <h2>NOT FOUND</h2>
  );
}
export default EventArticle;
