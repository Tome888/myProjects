interface BtnProps {
  btnClass: string;
  text: string;
}

function MemebrBtn({ btnClass, text }: BtnProps) {
  return <button className={btnClass}>{text}</button>;
}

export default MemebrBtn;
