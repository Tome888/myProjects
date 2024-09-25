interface WhiteContainerProps {
  miniTitle?: string;
  title: string;
  text?: string;
  customClass?: string;
}

function WhiteContainerText({
  title,
  text,
  customClass,
  miniTitle,
}: WhiteContainerProps) {
  return (
    <div className={`firstLeftDivMain ${customClass}`}>
      <span>{miniTitle}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
export default WhiteContainerText;
