// import {
//   Radio,
//   Dialog,
//   FormControlLabel,
//   RadioGroup,
//   Checkbox,
//   Button,
// } from "@mui/material";
// import React, { useState } from "react";
// import "./invoicedialog.css";
// import {
//   faChevronDown,
//   faCircleMinus,
//   faCreditCard,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// interface InvoiceDialogProps {
//   open: boolean;
//   onClose: () => void;
//   invoice: {
//     invoiceNo: string;
//     policies: string;
//     osigurenici: string;
//     dateExp: string;
//     price: number;
//     paidBy: string;
//     forPaying: string;
//     status: string;
//   } | null;
// }

// const InvoiceDialog: React.FC<InvoiceDialogProps> = ({
//   open,
//   onClose,
//   invoice,
// }) => {
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [showMore, setShowMore] = useState(false);

//   const tax = invoice ? (invoice.price / 100) * 18 : 0;
//   const discount = 200.0;

//   const totalAmount = invoice ? invoice.price + tax - discount : 0;

//   const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedMethod((event.target as HTMLInputElement).value);
//   };

//   const handleClickXMark = () => {
//     onClose();
//   };

//   const handleToggleClick = () => {
//     setShowMore(!showMore);
//   };

//   if (!invoice) {
//     return null;
//   }

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth={true}
//       maxWidth={"lg"}
//       PaperProps={{
//         sx: {
//           borderRadius: "30px",
//           height: "100%",
//           backgroundColor: "#eaeaea",
//         },
//       }}
//     >
//       <FontAwesomeIcon
//         className="xMarkLeave"
//         onClick={handleClickXMark}
//         icon={faXmark}
//       />
//       <div className="dialogPadding">
//         <h3>Плаќање на фактура {invoice.invoiceNo}</h3>
//         <div className="dialogInv">
//           <div className="InvDialogLeft">
//             <h3>Краток преглед</h3>
//             <div className="InvDialogLeftRow">
//               <p>Износ:</p>
//               <p>{invoice.price} ден.</p>
//             </div>
//             <div className="InvDialogLeftRow">
//               <p>Данок:</p>
//               <p>{tax} ден.</p>
//             </div>
//             <div className="InvDialogLeftRow">
//               <p>Попуст:</p>
//               <p>{discount} ден.</p>
//             </div>
//             <div className="InvDialogLeftRow invDialogLeftBorder">
//               <p>
//                 <strong>Вкупна Сума:</strong>
//               </p>
//               <p>
//                 <strong>{totalAmount} ден.</strong>
//               </p>
//             </div>
//             <div className="flexDiv">
//               <h5>Метод на плаќање</h5>
//               <RadioGroup
//                 value={selectedMethod}
//                 onChange={handleMethodChange}
//                 defaultValue="method1"
//               >
//                 <div className="radioGroup">
//                   <FormControlLabel
//                     value="method1"
//                     control={<Radio />}
//                     label="Зачувани"
//                   />
//                   <FormControlLabel
//                     value="method2"
//                     control={<Radio />}
//                     label="Ново"
//                   />
//                 </div>
//               </RadioGroup>
//             </div>
//             <p className="cardPar">
//               <FontAwesomeIcon icon={faCreditCard} />
//               Кредитна/Дебитна картичка
//             </p>
//             <h5 className="infoCardh5">Информации за картичката</h5>
//             <table className="invDiaLeftTable">
//               <tr>
//                 <td className="bright-none">1234 5678 1234 5678</td>
//                 <td
//                   className="bleft-none align-right "
//                   onClick={handleToggleClick}
//                 >
//                   <FontAwesomeIcon icon={faChevronDown} />
//                 </td>
//               </tr>
//               {showMore && (
//                 <>
//                   <tr>
//                     <td>25/06</td>
//                     <td className="alignCenter">000</td>
//                   </tr>
//                   <tr>
//                     <td colSpan={2}>Емилија Василева</td>
//                   </tr>
//                 </>
//               )}
//             </table>
//             <div className="infoPay">
//               <h3>Информации за наплата</h3>
//               <p>
//                 <FormControlLabel
//                   control={<Checkbox defaultChecked />}
//                   label=""
//                 />
//                 Користете ги информациите за мојата адреса за контакт{" "}
//               </p>
//               <Button className="submitBtn boldBtn" variant="outlined">
//                 Плати
//               </Button>
//             </div>
//           </div>
//           <div className="InvDialogRight">
//             <div className="greenRowCode"></div>
//             <div className="invDialogPad">
//               <div className="heading">
//                 <h3>Преглед</h3>
//                 <button>Преземете PDF</button>
//                 <button>Испрати на е-пошта</button>
//                 <button>Печати</button>
//               </div>
//               <div className="robotDiv">
//                 <img src="./images/SavaRobot.png" alt="" />
//                 <p>Фактура број: {invoice.invoiceNo}</p>
//                 <p className="payWait">
//                   <FontAwesomeIcon icon={faCircleMinus} /> Плаќањето е на чекање
//                 </p>
//               </div>
//               <div className="infoDiv">
//                 <table className="invDiaRightTableTop">
//                   <tr>
//                     <td className="mr-td greytext">Фактурирана до</td>
//                     <td className="mr-td greytext">Рок на достасување</td>
//                     <td className="greytext">Број на случај</td>
//                   </tr>
//                   <tr>
//                     <td className="mr-td">Сава</td>
//                     <td className="mr-td">Јул. 05. 2024</td>
//                     <td>{invoice.invoiceNo}-GH3</td>
//                   </tr>
//                 </table>
//                 <table className="invDiaRightTableBottom">
//                   <tr className="whiteBgTable">
//                     <td className="mr-td-big align-left">Опис на ставката</td>
//                     <td className="mr-td-small align-center">Количина</td>
//                     <td className="align-center">Цена</td>
//                   </tr>
//                   <tr className="borderBotTable">
//                     <td className="mr-td-big align-left">
//                       Велосипедска полиса
//                     </td>
//                     <td className="mr-td-small align-center">1</td>
//                     <td className="align-center">{invoice.price} ден</td>
//                   </tr>
//                   <tr className="pd-td">
//                     <td className="mr-td-big"></td>
//                     <td className="mr-td-small align-right">Износ:</td>
//                     <td className="align-center">{invoice.price} ден</td>
//                   </tr>
//                   <tr className="pd-td">
//                     <td className="mr-td-big align-center"></td>
//                     <td className="mr-td-small align-right">Данок:</td>
//                     <td className="align-center">{tax} ден</td>
//                   </tr>
//                   <tr className="pd-td">
//                     <td className="mr-td-big align-center"></td>
//                     <td className="mr-td-small align-right">Попуст:</td>
//                     <td className="align-center">{discount} ден</td>
//                   </tr>
//                   <tr className="pd-td borderBotTable">
//                     <td className="mr-td-big align-right">
//                       <strong>Вкупно за плаќање: </strong>
//                     </td>
//                     <td className="mr-td-small align-center"></td>
//                     <td className="align-center">
//                       <strong>{totalAmount} ден</strong>
//                     </td>
//                   </tr>
//                 </table>
//               </div>
//             </div>
//             <div className="greenRowCode HybridGreenRowCode">
//               <p>Ви Благодариме !</p>
//               <p>+0800 800 800 mk.sava.insure</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default InvoiceDialog;

import {
  Radio,
  Dialog,
  FormControlLabel,
  RadioGroup,
  Checkbox,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import "./invoicedialog.css";
import {
  faChevronDown,
  faCircleMinus,
  faCreditCard,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

interface InvoiceDialogProps {
  open: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onInvoiceStatusChange: (invoiceNo: string) => void;
}

const InvoiceDialog: React.FC<InvoiceDialogProps> = ({
  open,
  onClose,
  invoice,
  onInvoiceStatusChange,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showMore, setShowMore] = useState(false);

  const tax = invoice ? (invoice.price / 100) * 18 : 0;
  const discount = 200.0;

  const totalAmount = invoice ? invoice.price + tax - discount : 0;

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod((event.target as HTMLInputElement).value);
  };

  const handleClickXMark = () => {
    onClose();
  };

  const handleToggleClick = () => {
    setShowMore(!showMore);
  };

  const handlePayment = () => {
    if (invoice) {
      onInvoiceStatusChange(invoice.invoiceNo);
      onClose();
    }
  };

  if (!invoice) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={"lg"}
      PaperProps={{
        sx: {
          borderRadius: "30px",
          height: "100%",
          backgroundColor: "#eaeaea",
        },
      }}
    >
      <FontAwesomeIcon
        className="xMarkLeave"
        onClick={handleClickXMark}
        icon={faXmark}
      />
      <div className="dialogPadding">
        <h3>Плаќање на фактура {invoice.invoiceNo}</h3>
        <div className="dialogInv">
          <div className="InvDialogLeft">
            <h3>Краток преглед</h3>
            <div className="InvDialogLeftRow">
              <p>Износ:</p>
              <p>{invoice.price} ден.</p>
            </div>
            <div className="InvDialogLeftRow">
              <p>Данок:</p>
              <p>{tax} ден.</p>
            </div>
            <div className="InvDialogLeftRow">
              <p>Попуст:</p>
              <p>{discount} ден.</p>
            </div>
            <div className="InvDialogLeftRow invDialogLeftBorder">
              <p>
                <strong>Вкупна Сума:</strong>
              </p>
              <p>
                <strong>{totalAmount} ден.</strong>
              </p>
            </div>
            <div className="flexDiv">
              <h5>Метод на плаќање</h5>
              <RadioGroup
                value={selectedMethod}
                onChange={handleMethodChange}
                defaultValue="method1"
              >
                <div className="radioGroup">
                  <FormControlLabel
                    value="method1"
                    control={<Radio />}
                    label="Зачувани"
                  />
                  <FormControlLabel
                    value="method2"
                    control={<Radio />}
                    label="Ново"
                  />
                </div>
              </RadioGroup>
            </div>
            <p className="cardPar">
              <FontAwesomeIcon icon={faCreditCard} />
              Кредитна/Дебитна картичка
            </p>
            <h5 className="infoCardh5">Информации за картичката</h5>
            <table className="invDiaLeftTable">
              <tr>
                <td className="bright-none">1234 5678 1234 5678</td>
                <td
                  className="bleft-none align-right "
                  onClick={handleToggleClick}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </td>
              </tr>
              {showMore && (
                <>
                  <tr>
                    <td>25/06</td>
                    <td className="alignCenter">000</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Емилија Василева</td>
                  </tr>
                </>
              )}
            </table>
            <div className="infoPay">
              <h3>Информации за наплата</h3>
              <p>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label=""
                />
                Користете ги информациите за мојата адреса за контакт{" "}
              </p>
              <Button
                className="submitBtn boldBtn"
                variant="outlined"
                onClick={handlePayment}
              >
                Плати
              </Button>
            </div>
          </div>
          <div className="InvDialogRight">
            <div className="greenRowCode"></div>
            <div className="invDialogPad">
              <div className="heading">
                <h3>Преглед</h3>
                <button>Преземете PDF</button>
                <button>Испрати на е-пошта</button>
                <button>Печати</button>
              </div>
              <div className="robotDiv">
                <img src="./images/SavaRobot.png" alt="" />
                <p>Фактура број: {invoice.invoiceNo}</p>
                <p className="payWait">
                  <FontAwesomeIcon icon={faCircleMinus} /> Плаќањето е на чекање
                </p>
              </div>
              <div className="infoDiv">
                <table className="invDiaRightTableTop">
                  <tr>
                    <td className="mr-td greytext">Фактурирана до</td>
                    <td className="mr-td greytext">Рок на достасување</td>
                    <td className="greytext">Број на случај</td>
                  </tr>
                  <tr>
                    <td className="mr-td">Сава</td>
                    <td className="mr-td">Јул. 05. 2024</td>
                    <td>{invoice.invoiceNo}-GH3</td>
                  </tr>
                </table>
                <table className="invDiaRightTableBottom">
                  <tr className="whiteBgTable">
                    <td className="mr-td-big align-left">Опис на ставката</td>
                    <td className="mr-td-small align-center">Количина</td>
                    <td className="align-center">Цена</td>
                  </tr>
                  <tr className="borderBotTable">
                    <td className="mr-td-big align-left">
                      Велосипедска полиса
                    </td>
                    <td className="mr-td-small align-center">1</td>
                    <td className="align-center">{invoice.price} ден</td>
                  </tr>
                  <tr className="pd-td">
                    <td className="mr-td-big"></td>
                    <td className="mr-td-small align-right">Износ:</td>
                    <td className="align-center">{invoice.price} ден</td>
                  </tr>
                  <tr className="pd-td">
                    <td className="mr-td-big align-center"></td>
                    <td className="mr-td-small align-right">Данок:</td>
                    <td className="align-center">{tax} ден</td>
                  </tr>
                  <tr className="pd-td">
                    <td className="mr-td-big align-center"></td>
                    <td className="mr-td-small align-right">Попуст:</td>
                    <td className="align-center">{discount} ден</td>
                  </tr>
                  <tr className="pd-td borderBotTable">
                    <td className="mr-td-big align-right">
                      <strong>Вкупно за плаќање: </strong>
                    </td>
                    <td className="mr-td-small align-center"></td>
                    <td className="align-center">
                      <strong>{totalAmount} ден</strong>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="greenRowCode HybridGreenRowCode">
              <p>Ви Благодариме !</p>
              <p>+0800 800 800 mk.sava.insure</p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default InvoiceDialog;
