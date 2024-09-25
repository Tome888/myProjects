import { useLanguage } from "@/context/LanguageContext";
import ScheduleItem from "@/microComponents/ScheduleItem";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useState } from "react";

const translationsMap: Record<string, any> = {
  en,
  mk,
};

function AgendaConf() {
  const [day, setDay] = useState("one");
  const { language } = useLanguage();
  const translations = translationsMap[language];

  const getDayTranslationKey = (prefix: string) => {
    return day === "one" ? `dayOne${prefix}` : `dayTwo${prefix}`;
  };

  return (
    <section className="agendaConfSec">
      <h2>{translations.agendaTitle}</h2>
      <div className="dayTogglerWrapper">
        <p
          style={{ color: day === "one" ? "#e87b22" : "#21383e" }}
          onClick={() => setDay("one")}
        >
          {language === "mk" ? "Ден 1" : "Day 1"}
        </p>
        <p
          style={{ color: day === "two" ? "#e87b22" : "#21383e" }}
          onClick={() => setDay("two")}
        >
          {language === "mk" ? "Ден 2" : "Day 2"}
        </p>
      </div>
      <div className="schedule">
        <ScheduleItem
          time={day === "one" ? "10:00" : "16:00"}
          title={
            translations[getDayTranslationKey("RegistrationAndCoffeeTitle")]
          }
          desc={translations[getDayTranslationKey("RegistrationAndCoffeeDesc")]}
          presenter={null}
        />
        <ScheduleItem
          time={day === "one" ? "10:30" : "16:30"}
          title={translations[getDayTranslationKey("OpeningTitle")]}
          desc={translations[getDayTranslationKey("OpeningDesc")]}
          presenter={null}
        />
        <ScheduleItem
          time={day === "one" ? "11:00" : "17:00"}
          title={translations[getDayTranslationKey("PresentationTitle")]}
          desc={translations[getDayTranslationKey("PresentationDesc")]}
          presenter={
            translations[getDayTranslationKey("PresentationPresenter")]
          }
        />
        <ScheduleItem
          time={day === "one" ? "11:45" : "17:45"}
          title={translations[getDayTranslationKey("PanelDiscussionTitle")]}
          desc={translations[getDayTranslationKey("PanelDiscussionDesc")]}
          presenter={
            translations[getDayTranslationKey("PanelDiscussionPresenter")]
          }
        />
        <ScheduleItem
          time={day === "one" ? "12:30" : ""}
          title={translations[getDayTranslationKey("LunchBreakTitle")]}
          desc={translations[getDayTranslationKey("LunchBreakDesc")]}
          presenter={null}
          cusClass={"pauseOrangeLIne"}
        />
        <ScheduleItem
          time={day === "one" ? "13:00" : "19:00"}
          title={translations[getDayTranslationKey("WorkshopTitle")]}
          desc={translations[getDayTranslationKey("WorkshopDesc")]}
          presenter={translations[getDayTranslationKey("WorkshopPresenter")]}
        />
        <ScheduleItem
          time={day === "one" ? "14:00" : "20:00"}
          title={translations[getDayTranslationKey("ToolsAndMethodsTitle")]}
          desc={translations[getDayTranslationKey("ToolsAndMethodsDesc")]}
          presenter={
            translations[getDayTranslationKey("ToolsAndMethodsPresenter")]
          }
        />
        {day === "one" && (
          <ScheduleItem
            time={"14:45"}
            title={translations[getDayTranslationKey("ClosingTitle")]}
            desc={translations[getDayTranslationKey("ClosingDesc")]}
            presenter={null}
          />
        )}
      </div>
    </section>
  );
}

export default AgendaConf;
