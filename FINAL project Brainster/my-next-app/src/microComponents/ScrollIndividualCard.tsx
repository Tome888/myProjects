import { useRouter } from "next/router";

interface ScrollIndividualCardProp {
  theEvent: "1" | "2";
}

function ScrollIndividualCard({ theEvent }: ScrollIndividualCardProp) {
  const router = useRouter();

  return (
    <div
      className="cardsContainer eventsSCrollINdividual"
      key={theEvent}
      style={{
        backgroundImage: `url(/eventsImg/${
          theEvent === "1" ? "img1.jpg" : "img2.jpg"
        })`,
      }}
      onClick={() => router.push(`/events/${theEvent}`)}
    >
      <p>{theEvent === "1" ? "HR caffee" : "HR weekend"}</p>
      <p>{theEvent === "1" ? "Sample Title 1" : "Sample Title 2"}</p>
      <p className="monthP">{"Август"}</p>
      <p className="dayP">{theEvent === "1" ? "16" : "15"}</p>
    </div>
  );
}

export default ScrollIndividualCard;
