import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleDot,
  faCirclePlus,
  faCircleXmark,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import "./damages.css";

interface Damage {
  name: string;
  tecenje: string;
}

const damagesList: Damage[] = [
  { name: "PO-1234", tecenje: "Во обработка" },
  { name: "PO-7891", tecenje: "Ликвидација" },
  { name: "PO-4561", tecenje: "Исплатена" },
  { name: "PO-1223", tecenje: "Одбиена" },
  { name: "PO-15234", tecenje: "Во обработка" },
  { name: "PO-78234459", tecenje: "Ликвидација" },
  { name: "PO-78569", tecenje: "Ликвидација" },
  { name: "PO-4523461", tecenje: "Исплатена" },
  { name: "PO-123423", tecenje: "Одбиена" },
  { name: "PO-1523344", tecenje: "Во обработка" },
  { name: "PO-78459", tecenje: "Ликвидација" },
  { name: "PO-7855469", tecenje: "Ликвидација" },
  { name: "PO-458961", tecenje: "Исплатена" },
  { name: "PO-1227893", tecenje: "Одбиена" },
  { name: "PO-1523884", tecenje: "Во обработка" },
  { name: "PO-784759", tecenje: "Ликвидација" },
  { name: "PO-7857669", tecenje: "Ликвидација" },
];

const Damages = () => {
  const [selectedDamage, setSelectedDamage] = useState<Damage | null>(null);
  const [selectedTecenje, setSelectedTecenje] = useState<string>("Сите штети");

  const handleTecenjeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTecenje(event.target.value);
    setSelectedDamage(null);
  };

  const handleDamageClick = (damage: Damage) => {
    setSelectedDamage(damage);
  };

  const getIcons = (tecenje: string) => {
    switch (tecenje) {
      case "Во обработка":
        return [faCircleDot, faCircleDot, faCircleDot];
      case "Ликвидација":
        return [faCircleCheck, faCircleDot, faCircleDot];
      case "Исплатена":
        return [faCircleCheck, faCircleCheck, faCircleCheck];
      case "Одбиена":
        return [faCircleCheck, faCircleCheck, faCircleXmark];
      default:
        return [faCircleDot, faCircleDot, faCircleDot];
    }
  };

  const getIconText = (tecenje: string, index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="underIconText">
            <p className="firstParag">Во обработка</p>
            <p>*Вашето барање за осигурување на штета е во обработка.</p>
          </div>
        );
      case 1:
        return (
          <div className="underIconText">
            <p className="firstParag">Во ликвидација</p>
            <p>*Вашето барање за осигурување на штета е во ликвидација.</p>
          </div>
        );
      case 2:
        return tecenje === "Одбиена" ? (
          <div className="underIconText">
            <p className="firstParag">Одбиена</p>
            <p>*Вашето барање за осигурување на штета е одбиено.</p>
          </div>
        ) : (
          <div className="underIconText">
            <p className="firstParag">Исплатена</p>
            <p>*Вашето барање за осигурување на штета е исплатено.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const filteredDamages =
    selectedTecenje === "Сите штети"
      ? damagesList
      : damagesList.filter((damage) => damage.tecenje === selectedTecenje);

  return (
    <div className="whiteBg">
      <div className="damages">
        <h4>Штети</h4>
        <div className="formControls">
          <select
            className="inputFirst"
            name="damages"
            id="damages"
            value={selectedTecenje}
            onChange={handleTecenjeChange}
          >
            {Array.from(new Set(damagesList.map((damage) => damage.tecenje)))
              .concat("Сите штети")
              .map((tecenje, index) => (
                <option key={index} value={tecenje}>
                  {tecenje}
                </option>
              ))}
          </select>
          <Button className="submitBtn" variant="outlined">
            <FontAwesomeIcon className="iconPlus" icon={faCirclePlus} /> Пријави
            штета
          </Button>
        </div>

        <div className="submitDamages">
          <div className="left fb-25">
            <h3>Пријавени штети</h3>
            <div className="overflowHidden">
              {filteredDamages.map((damage, index) => (
                <div key={index} className="damageBtns">
                  <button
                    className={`${
                      selectedDamage && selectedDamage.name === damage.name
                        ? "activeDamageBtn"
                        : ""
                    }`}
                    onClick={() => handleDamageClick(damage)}
                  >
                    {damage.name}{" "}
                    <FontAwesomeIcon className="playIcon" icon={faPlay} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="right fb-75">
            {selectedDamage && (
              <div className="damageDetails">
                <h3>{selectedDamage.name}</h3>
                <div className="damageWrapper">
                  {getIcons(selectedDamage.tecenje).map((icon, index) => (
                    <div key={index} className="iconWrapper">
                      <FontAwesomeIcon
                        className={
                          icon === faCircleXmark
                            ? "iconsTecenje iconXmark"
                            : "iconsTecenje"
                        }
                        icon={icon}
                      />
                      {getIconText(selectedDamage.tecenje, index)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Damages;
