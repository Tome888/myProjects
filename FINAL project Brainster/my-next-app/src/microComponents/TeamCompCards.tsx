interface PersonProp {
  name: string;
  poss: string;
}

function TeamCompCards({ name, poss }: PersonProp) {
  return (
    <div className="cardPerson">
      <img src="/pfps/anon.png" alt="" />
      <h3>{name}</h3>
      <p>{poss}</p>
      <div>
        <i className="fa-brands fa-square-facebook"></i>
        <i className="fa-brands fa-square-twitter"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-linkedin"></i>
      </div>
    </div>
  );
}

export default TeamCompCards;
