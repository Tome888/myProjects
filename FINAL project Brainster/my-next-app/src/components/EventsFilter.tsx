import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card } from "@/microComponents/InfiniteCardScroll";
import BlogCard from "@/microComponents/BlogCard";
import { useLanguage } from "@/context/LanguageContext";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";

interface EventsFilterProp {
  arrEventFilter: Card[];
}
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function EventsFilter({ arrEventFilter }: EventsFilterProp) {
  const router = useRouter();
  const [filteredEvents, setFilteredEvents] = useState<Card[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];

  useEffect(() => {
    if (router.query.category) {
      const categoryParams = (router.query.category as string).split(",");
      setActiveFilters(categoryParams);
    }
  }, [router.query]);

  useEffect(() => {
    const filtered = arrEventFilter.filter((event) => {
      const matchesFilters =
        activeFilters.length === 0 || activeFilters.includes(event.category);
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      return matchesFilters && matchesSearch;
    });
    setFilteredEvents(filtered);
  }, [arrEventFilter, activeFilters, searchInput]);

  const handleFilterClick = (category: string) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((filter) => filter !== category)
        : [...prevFilters, category]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <section>
      <div className="buttonsWrapperFilter">
        <button
          onClick={() => {
            setActiveFilters([]);
            router.push("/events", undefined, { shallow: true });
          }}
          className={activeFilters.length === 0 ? "activeFilterBtn" : ""}
        >
          Сите
        </button>
        <button
          onClick={() => handleFilterClick("HR caffee")}
          className={
            activeFilters.includes("HR caffee") ? "activeFilterBtn" : ""
          }
        >
          HR caffee
        </button>
        <button
          onClick={() => handleFilterClick("HR weekend")}
          className={
            activeFilters.includes("HR weekend") ? "activeFilterBtn" : ""
          }
        >
          HR weekend
        </button>
        <button
          onClick={() => handleFilterClick("HR webinar")}
          className={
            activeFilters.includes("HR webinar") ? "activeFilterBtn" : ""
          }
        >
          HR webinar
        </button>
        <button
          onClick={() => handleFilterClick("HR conferences")}
          className={
            activeFilters.includes("HR conferences") ? "activeFilterBtn" : ""
          }
        >
          HR conferences
        </button>
      </div>

      <form className="formSearchFilter" action="submit">
        <label>{translations.allEvents}</label>
        <input
          type="text"
          placeholder="search"
          value={searchInput}
          onChange={handleSearchChange}
        />
      </form>

      <div className="eventsCardsWrapper">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <BlogCard
              id={event.id}
              title={event.title}
              text={event.text}
              img={event.img}
              category={event.category}
              key={event.id}
              cardType="event"
            />
          ))
        ) : (
          <p>{translations.noDataFound}</p>
        )}
      </div>
    </section>
  );
}

export default EventsFilter;
