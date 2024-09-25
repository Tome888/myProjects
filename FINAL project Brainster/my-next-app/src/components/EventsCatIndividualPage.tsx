import BlogCard from "@/microComponents/BlogCard";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface EventsCatIndividualPageProps {
  getCategory: string;
}
interface DataProps {
  id: number;
  title: string;
  category: string;
  day: number;
  month: number;
  year: number;
  img: string;
  text: string;
}
function EventsCatIndividualPage({
  getCategory,
}: EventsCatIndividualPageProps) {
  const router = useRouter();
  const [arrData, setArrData] = useState<DataProps[] | null>(null);
  const [arrDataFull, setArrDataFull] = useState<DataProps[] | []>([]);
  const [toggler, setToggler] = useState(false);
  const [downloadAll, setDownaloadAll] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5001/api/events?category=${getCategory}&_limit=4`)
      .then((res) => res.json())
      .then((data) => {
        setArrData(data);
      })
      .catch((err) => console.error(err));
  }, [router]);

  const downloadCards = () => {
    if (downloadAll <= 0) {
      fetch(`http://localhost:5000/events?category=${getCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setArrDataFull(data);
        })
        .catch((err) => console.error(err));
    }
  };

  const showFour = () => {
    return (
      arrData &&
      arrData.map((eventCard) => {
        return (
          <BlogCard
            id={eventCard.id}
            title={eventCard.title}
            text={eventCard.text}
            img={eventCard.img}
            category={eventCard.category}
            key={eventCard.id}
            cardType="event"
          />
        );
      })
    );
  };

  const showAll = () => {
    return (
      arrDataFull &&
      arrDataFull.map((eventCard) => {
        return (
          <BlogCard
            id={eventCard.id}
            title={eventCard.title}
            text={eventCard.text}
            img={eventCard.img}
            category={eventCard.category}
            key={eventCard.id}
            cardType="event"
          />
        );
      })
    );
  };
  return (
    <section className="showCardsEventsSection">
      <div className="titlePageShowMoreLessWrapper">
        <h3>Претстојни настани</h3>
      </div>
      <div className="cardWrapperShowMore">
        {toggler ? showAll() : showFour()}
      </div>
    </section>
  );
}

export default EventsCatIndividualPage;
