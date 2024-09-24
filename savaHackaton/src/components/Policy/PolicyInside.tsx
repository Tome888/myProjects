import "./policyinside.css";
import PolicySelect from "./PolicySelect";
import { useState } from "react";
import PolicyTable from "./PolicyTable";

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

const rows: PolicyData[] = [
  {
    type: "Bike",
    policyNo: "PO-123456",
    packet: "",
    personNo: 1,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "active",
  },
  {
    type: "Car",
    policyNo: "PO-123457",
    packet: "",
    personNo: 2,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "inactive",
  },
  {
    type: "Bag",
    policyNo: "PO-123458",
    packet: "",
    personNo: 3,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "active",
  },
  {
    type: "Bike",
    policyNo: "PO-123459",
    packet: "",
    personNo: 4,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "inactive",
  },
  {
    type: "Bag",
    policyNo: "PO-123460",
    packet: "",
    personNo: 5,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "active",
  },
  {
    type: "Bike",
    policyNo: "PO-123461",
    packet: "",
    personNo: 6,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "inactive",
  },
  {
    type: "Car",
    policyNo: "PO-123462",
    packet: "",
    personNo: 7,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "active",
  },
  {
    type: "Bag",
    policyNo: "PO-123463",
    packet: "",
    personNo: 8,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "inactive",
  },
  {
    type: "Bike",
    policyNo: "PO-123464",
    packet: "",
    personNo: 9,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "active",
  },
  {
    type: "Bag",
    policyNo: "PO-123465",
    packet: "",
    personNo: 10,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "inactive",
  },
  {
    type: "Bike",
    policyNo: "PO-123466",
    packet: "",
    personNo: 11,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "active",
  },
  {
    type: "Car",
    policyNo: "PO-123467",
    packet: "",
    personNo: 12,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "inactive",
  },
  {
    type: "Bag",
    policyNo: "PO-123468",
    packet: "",
    personNo: 13,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "active",
  },
  {
    type: "Bike",
    policyNo: "PO-123469",
    packet: "",
    personNo: 14,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "inactive",
  },
  {
    type: "Bag",
    policyNo: "PO-123470",
    packet: "",
    personNo: 15,
    osigurenici: "Емилија",
    dateExp: "24/07 - 28/08",
    price: 1200,
    paidBy: "card",
    download: "PDF",
    status: "active",
  },
];

const rowsPerPage = 9;

const PolicyInside = () => {
  const [page, setPage] = useState(0);
  const [filteredPolicies, setFilteredPolicies] = useState(rows); // State to manage filtered policies

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(
        prevPage + 1,
        Math.ceil(filteredPolicies.length / rowsPerPage) - 1
      )
    );
  };

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const rowsToDisplay = filteredPolicies.slice(start, end);

  const handleFilterChange = (filter: string) => {
    let filtered = rows;
    if (filter === "active") {
      filtered = rows.filter((policy) => policy.status === "active");
    } else if (filter === "inactive") {
      filtered = rows.filter((policy) => policy.status === "inactive");
    }
    setFilteredPolicies(filtered);
    setPage(0); // Reset page to 0 when filter changes
  };

  return (
    <>
    <div className="whiteBg">
      <div className="policyInside">
        <h4>Полиси</h4>
        <PolicySelect policies={rows} onFilterChange={handleFilterChange} />

        <PolicyTable
          rows={rowsToDisplay}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={filteredPolicies.length}
          setPage={setPage} // Pass setPage to PolicyTable
        />
      </div>
    </div>
    <div className="mobileWrapperPol" style={{display: 'none'}}>
      <h3 className="h3mobile">Полиси</h3>
      <div className="selectWrapperMobile">
        <select className="mobileSelect" name="" id="">
          <option value="1">нешто</option>
          <option value="2">нешто</option>
          <option value="3">нешто</option>
        </select>
        <select className="mobileSelect" name="" id="">
          <option value="1">нешто</option>
          <option value="2">нешто</option>
          <option value="3">нешто</option>
        </select>
      </div>

      <div className="containerBlocks">
      <i className="fa-solid fa-car fa-3x" style={{color: '#ffffff'}}></i>
      <div className="wrapperTextMobile">
        <p>Полиси за возило</p>
        <a>Види повеќе</a>
      </div>
      </div>
      <div className="containerBlocks">
      <i className="fa-solid fa-car fa-3x" style={{color: '#ffffff'}}></i>
      <div className="wrapperTextMobile">
        <p>Полиси за возило</p>
        <a>Види повеќе</a>
      </div>
      </div>
      <div className="containerBlocks">
      <i className="fa-solid fa-car fa-3x" style={{color: '#ffffff'}}></i>
      <div className="wrapperTextMobile">
        <p>Полиси за возило</p>
        <a>Види повеќе</a>
      </div>
      </div>
    </div>
    </>
    
  );
};

export default PolicyInside;
