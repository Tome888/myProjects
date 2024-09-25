import Link from "next/link";

interface EventsListingCardProps {
  id: any;
  category: string;
  text: string;
}

function EventsListingCard({ id, category, text }: EventsListingCardProps) {
  return (
    <div className="buyTicketEventWrapper">
      <div className="logo logoInCard"></div>
      <p className="grayTextCard">МАЧР</p>
      <p className="grayTextCard">30 минути</p>

      <h3 className="catInCard">{category}</h3>
      <p className="textInCard">{text}</p>

      <div className="interactiveWrapperCard">
        <Link href={`/events/${id}`}>Прочитај повеќе</Link>
        <button className="buttonAni">Купи карта</button>
      </div>
    </div>
  );
}
export default EventsListingCard;
