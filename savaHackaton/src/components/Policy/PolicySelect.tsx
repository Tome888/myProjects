import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "./policyselect.css";

interface PolicyData {
  type: string;
  policyNo: string;
  packet: string;
  personNo: number;
  osigurenici: string;
  dateExp: string;
  price: number;
  paidBy: string;
  download: string;
  status: string;
}

interface PolicySelectProps {
  policies: PolicyData[];
  onFilterChange: (filter: string) => void; // Add this prop
}

const PolicySelect: React.FC<PolicySelectProps> = ({
  policies,
  onFilterChange,
}) => {
  const [selectedPolicy, setSelectedPolicy] = useState(""); // State to manage selected policy
  const [filter, setFilter] = useState("all"); // State to manage policy filter

  const handlePolicyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPolicy(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    onFilterChange(selectedFilter); // Call the onFilterChange prop
  };

  return (
    <div className="selectDiv">
      <div className="formControls">
        <select
          className="inputFirst"
          name="policyNo"
          id="policyNo"
          value={selectedPolicy}
          onChange={handlePolicyChange}
        >
          <option value="" disabled>
            -- Изберете Полиса --
          </option>
          {policies.map((policy) => (
            <option key={policy.policyNo} value={policy.policyNo}>
              {policy.policyNo}
            </option>
          ))}
        </select>
        <select
          name="filter"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">Сите полиси</option>
          <option value="active">Активни полиси</option>
          <option value="inactive">Неактивни полиси</option>
        </select>
      </div>
      <div className="BtnBuy">
        <Button className="submitBtn" variant="outlined">
          <FontAwesomeIcon className="iconPlus" icon={faCirclePlus} /> Купи
          полиса
        </Button>
      </div>
    </div>
  );
};

export default PolicySelect;
