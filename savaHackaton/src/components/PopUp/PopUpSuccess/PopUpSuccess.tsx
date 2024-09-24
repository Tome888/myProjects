import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@mui/material";
import "./popupsuccess.css";

const PopUpSuccess = () => {
  return (
    <Dialog
      open={true}
      PaperProps={{
        sx: {
          borderRadius: "50px",
          width: "50%",
          height: "70%",
          overflow: "hidden",
          padding: "6rem",
        },
      }}
    >
      <div className="popupsuccess">
        <FontAwesomeIcon className="circleCheck" icon={faCircleCheck} />
        <h4>Успешно пријавување!</h4>
        <p>
          Успешно се најавивте на Sava. <br /> Сега можете да управувате со
          вашите полиси, да поднесувате побарувања и да истражувате нови планови
          за осигурување.
        </p>
      </div>
    </Dialog>
  );
};

export default PopUpSuccess;
