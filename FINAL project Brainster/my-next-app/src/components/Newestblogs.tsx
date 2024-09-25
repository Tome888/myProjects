import { useLanguage } from "@/context/LanguageContext";
import BlogCard from "@/microComponents/BlogCard";
import ScrollIndividualCard from "@/microComponents/ScrollIndividualCard";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useEffect, useState } from "react";
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function Newestblogs() {
  const [filteredBlogs, setFilteredBlogs] = useState<any[] | null>(null);
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];

  useEffect(() => {
    fetch("http://localhost:5001/api/blogs?limit=2")
      .then((res) => res.json())
      .then((data) => setFilteredBlogs(data));
  }, []);
  if (filteredBlogs)
    return (
      <section className="newestBlogsSection">
        <img src="/grDots.png" alt="" className="dotGrComm" />
        <h2>{translations.newestBlogs}</h2>
        <div>
          <div>
            {filteredBlogs.length > 0 ? (
              <BlogCard
                id={filteredBlogs[0].id}
                title={filteredBlogs[0].title}
                text={filteredBlogs[0].text}
                img={filteredBlogs[0].img}
                category={filteredBlogs[0].category}
                key={filteredBlogs[0].id}
                cardType="blog"
              />
            ) : (
              <p>{translations.loading}</p>
            )}
            <ScrollIndividualCard theEvent={"1"} />
            <ScrollIndividualCard theEvent={"2"} />
            {filteredBlogs.length > 0 ? (
              <BlogCard
                id={filteredBlogs[1].id}
                title={filteredBlogs[1].title}
                text={filteredBlogs[1].text}
                img={filteredBlogs[1].img}
                category={filteredBlogs[1].category}
                key={filteredBlogs[1].id}
                cardType="blog"
              />
            ) : (
              <p>{translations.loading}</p>
            )}
          </div>
          <div
            className="cardsContainer singleEventScrlRight"
            style={{
              backgroundImage: `url(/eventsImg/img6.jpg)`,
            }}
          >
            <p className="zIndexx">{translations.latestAds}</p>
            <ul className="zIndexx">
              <li>{translations.hrAdmin}</li>
              <li>{translations.intern1}</li>
              <li>{translations.intern2}</li>
              <li>{translations.executiveManager}</li>
              <li>{translations.hrIntern}</li>
              <li>{translations.managementTrainee}</li>
              <li>{translations.hrManager}</li>
            </ul>
          </div>
        </div>
      </section>
    );
}
export default Newestblogs;
