import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonBiking,
  faCar,
  faSuitcaseRolling,
} from "@fortawesome/free-solid-svg-icons"; // Import necessary icons
import "./policytable.css"; // Make sure to add styles for pagination

interface PolicyTableProps {
  rows: {
    id: string;
    type: string;
    policyNo: string;
    packet: string;
    personNo: number;
    osigurenici: string;
    dateExp: string;
    price: number;
    paidBy: string;
    download: string;
  }[];
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  page: number;
  rowsPerPage: number;
  totalRows: number;
  setPage: (page: number) => void; // Add this to navigate to specific pages
}

const PolicyTable: React.FC<PolicyTableProps> = ({
  rows,
  handlePreviousPage,
  handleNextPage,
  page,
  rowsPerPage,
  totalRows,
  setPage,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, borderRadius: 30 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow className="greenRow">
              <TableCell className="whiteColor">Тип</TableCell>
              <TableCell className="whiteColor" align="right">
                Број на полиса
              </TableCell>
              <TableCell className="whiteColor" align="right">
                Пакет
              </TableCell>
              <TableCell className="whiteColor" align="right">
                Бр. на лица
              </TableCell>
              <TableCell className="whiteColor" align="right">
                Осигуреници
              </TableCell>
              <TableCell className="whiteColor" align="right">
                Рок
              </TableCell>
              <TableCell className="whiteColor" align="right">
                Цена
              </TableCell>
              <TableCell className="whiteColor" align="right">
                Платено
              </TableCell>
              <TableCell className="whiteColor" align="right">
                Преземи
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.policyNo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="cellIcons" component="th" scope="row">
                  {row.type === "Bike" && (
                    <FontAwesomeIcon icon={faPersonBiking} />
                  )}
                  {row.type === "Car" && <FontAwesomeIcon icon={faCar} />}
                  {row.type === "Bag" && (
                    <FontAwesomeIcon icon={faSuitcaseRolling} />
                  )}
                </TableCell>
                <TableCell align="right">{row.policyNo}</TableCell>
                <TableCell align="right">{row.packet}</TableCell>
                <TableCell align="right">{row.personNo}</TableCell>
                <TableCell align="right">{row.osigurenici}</TableCell>
                <TableCell align="right">{row.dateExp}</TableCell>
                <TableCell align="right">{row.price} ден.</TableCell>
                <TableCell align="right">{row.paidBy}</TableCell>
                <TableCell align="right">{row.download}</TableCell>
              </TableRow>
            ))}
            <TableRow className="greenRow">
              <TableCell className="whiteColor" colSpan={9} align="center">
                Вкупен износ: {rows.reduce((sum, row) => sum + row.price, 0)}{" "}
                ден.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <FontAwesomeIcon icon={faAnglesLeft} onClick={handlePreviousPage} />
        {[...Array(totalPages)].map((_, index) => (
          <span
            key={index}
            className={`page-number ${
              page === index ? "activePage spanNum" : "spanNum"
            }`}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </span>
        ))}
        <FontAwesomeIcon icon={faAnglesRight} onClick={handleNextPage} />
      </div>
    </div>
  );
};

export default PolicyTable;
