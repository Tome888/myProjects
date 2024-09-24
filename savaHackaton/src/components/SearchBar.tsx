import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "#ffffffA1",
  "&:hover": {
    backgroundColor: "#ffffff",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export function SearchBar() {
  return (
    <div className="searchBar" style={{ justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <FontAwesomeIcon className="phoneVolume" icon={faPhoneVolume} />
        <p>0800 80 000</p>
      </div>
      <div className="searchWrapper">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Пребарувај"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <i
          className="fa-regular fa-bell fa-2x"
          style={{ color: "#01A180", marginLeft: "0.5rem" }}
        ></i>
        <i
          className="fa-solid fa-earth-americas fa-2x"
          style={{ color: "#01A180", marginLeft: "0.5rem" }}
        ></i>
      </div>
    </div>
  );
}
