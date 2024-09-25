import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";

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

export interface Card {
  id: number;
  title: string;
  category: string;
  day: number;
  month: number;
  year: number;
  img: string;
  text: string;
}

const InfiniteCardScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrolling, setScrolling] = useState(true);
  const [cardsData, setCardsData] = useState<Card[] | null>(null);
  const router = useRouter();
  const { language } = useLanguage();

  const currentLanguage = language as "mk" | "en";

  const currentMonths = months[currentLanguage];

  useEffect(() => {
    fetch("http://localhost:5001/api/events")
      .then((res) => res.json())
      .then((data) => {
        setCardsData(data);
      });
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleMouseEnter = () => {
      setScrolling(false);
    };

    const handleMouseLeave = () => {
      setScrolling(true);
    };

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("wheel", handleScroll);

    const scrollInterval = setInterval(() => {
      if (scrolling && container) {
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 2;
        }
      }
    }, 8);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("wheel", handleScroll);
      clearInterval(scrollInterval);
    };
  }, [scrolling]);

  return (
    <div className="shadersRefPoint">
      <div ref={containerRef} className="bgScroll">
        <div className="bgScroll"></div>
        <div className="bgScroll"></div>
        {cardsData &&
          cardsData.map((card) => (
            <div
              className="cardsContainer"
              key={card.id}
              style={{
                backgroundImage: `url(/eventsImg/${card.img})`,
              }}
              onClick={() => router.push(`/events/${card.id}`)}
            >
              <p>{card.category}</p>
              <p>{card.title}</p>
              <p className="monthP">{currentMonths[card.month - 1]}</p>
              <p className="dayP">{card.day}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InfiniteCardScroll;
