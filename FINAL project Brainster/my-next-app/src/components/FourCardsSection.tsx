import BlogCard from "@/microComponents/BlogCard";
import { CardProps } from "@/pages";
import { useEffect, useState } from "react";

interface FourCardSection {
  typeCards: "events" | "blogs";
}

function FourCardsSection({ typeCards }: FourCardSection) {
  const [fourBlogCards, setFourBlogCards] = useState<CardProps[] | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/${typeCards}?limit=4`)
      .then((res) => res.json())
      .then((data: CardProps[]) => {
        setFourBlogCards(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setFourBlogCards([]);
      });
  }, []);
  return (
    <div className="actualEvents">
      {fourBlogCards &&
        fourBlogCards.map((card) => {
          return typeCards === "blogs" ? (
            <BlogCard
              key={card.id}
              id={card.id}
              title={card.title}
              text={card.text}
              img={card.img}
              category={card.category}
              cardType={"blog"}
            />
          ) : (
            <BlogCard
              key={card.id}
              id={card.id}
              title={card.title}
              text={card.text}
              img={card.img}
              category={card.category}
              cardType={"event"}
            />
          );
        })}
    </div>
  );
}

export default FourCardsSection;
