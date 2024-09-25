interface BenifitLiProps {
  num: string;
  title: string;
}

function BenifitLi({ num, title }: BenifitLiProps) {
  return (
    <div>
      <p>{num}</p>
      <div>
        <h2>{title}</h2>
        <p>Прочитај повеќе</p>
      </div>
    </div>
  );
}

export default BenifitLi;
