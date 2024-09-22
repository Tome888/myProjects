interface RestCardsProps {
  imgLink: string;
  nameRest: string;
  cat: string;
}

function RestCards({ imgLink, nameRest, cat }: RestCardsProps) {
  return (
    <div className="restCardWrapper">
      <img src={imgLink} alt="" />
      <h3>{nameRest}</h3>
      <p>{cat}</p>
    </div>
  );
}

export default RestCards;
