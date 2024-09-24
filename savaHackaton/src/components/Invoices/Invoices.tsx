import "./invoices.css";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import InvoiceDialog from "./InvoiceDialog";

interface Invoice {
  invoiceNo: string;
  policies: string;
  osigurenici: string;
  dateExp: string;
  price: number;
  paidBy: string;
  forPaying: string;
  status: string;
}

const rows: Invoice[] = [
  {
    invoiceNo: "F-1",
    policies: "Изберете полиси 1",
    osigurenici: "Емилија",
    dateExp: "28/06/2024",
    price: 1000,
    paidBy: "",
    forPaying: "",
    status: "Плати сега",
  },
  {
    invoiceNo: "F-2",
    policies: "Изберете полиси 2",
    osigurenici: "Емилија",
    dateExp: "28/06/2024",
    price: 1500,
    paidBy: "",
    forPaying: "",
    status: "Платено",
  },
  {
    invoiceNo: "F-3",
    policies: "Изберете полиси 3",
    osigurenici: "Емилија",
    dateExp: "28/06/2024",
    price: 1200,
    paidBy: "",
    forPaying: "",
    status: "Плати сега",
  },
  {
    invoiceNo: "F-4",
    policies: "Изберете полиси 4",
    osigurenici: "Емилија",
    dateExp: "28/06/2024",
    price: 1000,
    paidBy: "",
    forPaying: "",
    status: "Плати сега",
  },
  {
    invoiceNo: "F-5",
    policies: "Изберете полиси 5",
    osigurenici: "Емилија",
    dateExp: "28/06/2024",
    price: 1500,
    paidBy: "",
    forPaying: "",
    status: "Платено",
  },
  {
    invoiceNo: "F-6",
    policies: "Изберете полиси 6",
    osigurenici: "Емилија",
    dateExp: "28/06/2024",
    price: 1200,
    paidBy: "",
    forPaying: "",
    status: "Плати сега",
  },
];

const Invoices = () => {
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<string>("Сите фактури");
  const [filteredRows, setFilteredRows] = useState<Invoice[]>(rows); // State for filtered rows
  const rowsPerPage = 9;

  useEffect(() => {
    setFilteredRows(rows);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedPolicy(selectedValue);

    let filteredInvoices: Invoice[] = [];

    switch (selectedValue) {
      case "Сите фактури":
        filteredInvoices = rows;
        break;
      case "Платени фактури":
        filteredInvoices = rows.filter(
          (invoice) => invoice.status === "Платено"
        );
        break;
      case "Неплатени фактури":
        filteredInvoices = rows.filter(
          (invoice) => invoice.status === "Плати сега"
        );
        break;
      default:
        filteredInvoices = rows;
        break;
    }

    setFilteredRows(filteredInvoices);
    setPage(0);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredRows.length / rowsPerPage) - 1)
    );
  };

  const handleInvoiceClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    if (invoice.status === "Плати сега") {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInvoiceStatusChange = (invoiceNo: string) => {
    setFilteredRows((prevRows) =>
      prevRows.map((invoice) =>
        invoice.invoiceNo === invoiceNo
          ? { ...invoice, status: "Платено" }
          : invoice
      )
    );
  };

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Calculate the total amount for unpaid invoices
  const totalUnpaidAmount = filteredRows
    .filter((row) => row.status === "Плати сега")
    .reduce((sum, row) => sum + row.price, 0);

  return (
    <div className="whiteBg">
      <div className="invoices">
        <h4>Фактури</h4>
        <div className="formControls">
          <select
            className="inputFirst"
            value={selectedPolicy}
            onChange={handleChange}
          >
            <option value="Сите фактури">Сите фактури</option>
            <option value="Платени фактури">Платени фактури</option>
            <option value="Неплатени фактури">Неплатени фактури</option>
          </select>
          <Button className="submitBtn" variant="outlined">
            Плати брзо
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow className="greenRow">
                <TableCell className="whiteColor">Број на фактури</TableCell>
                <TableCell className="whiteColor" align="right">
                  Полиси
                </TableCell>
                <TableCell className="whiteColor" align="right">
                  Осигуреници
                </TableCell>
                <TableCell className="whiteColor" align="right">
                  Рок
                </TableCell>
                <TableCell className="whiteColor" align="right">
                  Износ без ДДВ
                </TableCell>
                <TableCell className="whiteColor" align="right">
                  Платено со
                </TableCell>
                <TableCell className="whiteColor" align="right">
                  За плаќање
                </TableCell>
                <TableCell className="whiteColor" align="right">
                  Статус
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredRows
              ).map((row) => (
                <TableRow
                  key={row.invoiceNo}
                  className={`invoiceRow ${
                    selectedInvoice &&
                    selectedInvoice.invoiceNo === row.invoiceNo
                      ? "activeInvoicePage"
                      : ""
                  }`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleInvoiceClick(row)}
                >
                  <TableCell className="textCenter" component="th" scope="row">
                    {row.invoiceNo}
                  </TableCell>
                  <TableCell className="textCenter" align="right">
                    {row.policies}
                  </TableCell>
                  <TableCell className="textCenter" align="right">
                    {row.osigurenici}
                  </TableCell>
                  <TableCell className="textCenter" align="right">
                    {row.dateExp}
                  </TableCell>
                  <TableCell className="textCenter" align="right">
                    {row.price}
                  </TableCell>
                  <TableCell className="textCenter" align="right">
                    {row.paidBy}
                  </TableCell>
                  <TableCell className="textCenter" align="right">
                    {row.forPaying}
                  </TableCell>
                  <TableCell className="textCenter" align="right">
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="greenRow">
                <TableCell className="whiteColor" colSpan={8} align="center">
                  Вкупен износ за неплатени фактури: {totalUnpaidAmount} ден.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination">
          <FontAwesomeIcon
            icon={faAngleLeft}
            onClick={handlePreviousPage}
            className={`pagination-icon ${page === 0 ? "disabled" : ""}`}
          />
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
          <FontAwesomeIcon
            icon={faAngleRight}
            onClick={handleNextPage}
            className={`pagination-icon ${
              page === totalPages - 1 ? "disabled" : ""
            }`}
          />
        </div>
        {openDialog && selectedInvoice && (
          <InvoiceDialog
            open={openDialog}
            onClose={handleCloseDialog}
            invoice={selectedInvoice}
            onInvoiceStatusChange={handleInvoiceStatusChange}
          />
        )}
      </div>
    </div>
  );
};

export default Invoices;
