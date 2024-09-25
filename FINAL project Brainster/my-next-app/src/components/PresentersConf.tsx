import { useEffect, useState } from "react";
import { TeamComProp } from "@/pages/about";
import TeamCompCards from "@/microComponents/TeamCompCards";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useLanguage } from "@/context/LanguageContext";
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};

function PresentersConf() {
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  const [list, setList] = useState<TeamComProp[] | null>(null);
  useEffect(() => {
    fetch("http://localhost:5001/api/teamComp?limit=3")
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  return (
    <section className="presentersConfSec">
      <img src="/grDots.png" alt="" className="dotGrComm" />
      <h2>{translations.eventSpeakers}:</h2>
      <div>
        {list &&
          list.map((person) => {
            return (
              <TeamCompCards
                name={person.name}
                poss={person.position}
                key={person.id}
              />
            );
          })}
      </div>
    </section>
  );
}

export default PresentersConf;
