import EventsFilter from "@/components/EventsFilter";
import HeroSectionTwo from "@/components/HeroSectionTwo";
import BreadCrumbs from "@/microComponents/BreadCrumbs";
import CustomCalendar from "@/microComponents/Calendar";
import { Card } from "@/microComponents/InfiniteCardScroll";
import WhiteContainerText from "@/microComponents/WhiteContainerText";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useLanguage } from "@/context/LanguageContext";

interface EventsPageProps {
  events: Card[];
}

const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};

function Events({ events }: EventsPageProps) {
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  const router = useRouter();

  return (
    <>
      <Head>
        <title>MHRA</title>
        <meta name="description" content="Events MHRA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSectionTwo img1="/eventsImg/img1.jpg" img2="/eventsImg/img1.jpg">
        <>
          <WhiteContainerText
            title={translations.eventCategoryTitle}
            customClass="blogHeroWhiteWrapper"
            text={translations.heroText}
            miniTitle={translations.highlitedEvent}
          />
          <button
            className="buttonAni buton123"
            onClick={() => router.push("/events/hrcaffee")}
          >
            {translations.readMore1}
          </button>
        </>
      </HeroSectionTwo>
      <BreadCrumbs />

      <section className="calendarSection">
        <img src="/grDots.png" alt="" className="dotGrComm" />
        <div className="calendarSecTextWrapper">
          <h2>{translations.calendarTitle}</h2>
          <p>{translations.calendarDescription}</p>
        </div>
        <CustomCalendar arrEvents={events} />
      </section>
      <EventsFilter arrEventFilter={events} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:5001/api/events");
  const events: Card[] = await res.json();

  return {
    props: {
      events,
    },
  };
};

export default Events;
