interface PacketsCardProps {
  type: string;
  money: string;
  benefits: string[];
}

function PacketsCard({ type, money, benefits }: PacketsCardProps) {
  return (
    <div className="packetsWrapper">
      <h2>{type}</h2>
      <h3>{money}</h3>
      <ul>
        {benefits.map((str, inx) => {
          return <li key={inx}>{str}</li>;
        })}
      </ul>
      <button className="buttonAni">КУПИ КАРТА</button>
    </div>
  );
}

export default PacketsCard;
