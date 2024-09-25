import React from "react";

interface AlertPopupProps {
  color: string;
  text: string;
  customClass?: string;
  activeClass: string;
}

function AlertPopup({
  color,
  text,
  customClass,
  activeClass,
}: AlertPopupProps) {
  return (
    <div
      className={`alertPopupDiv ${activeClass} ${customClass}`}
      style={{ backgroundColor: `${color}` }}
    >
      <h4>{text}</h4>
    </div>
  );
}

export default AlertPopup;
