import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import phoneImg from "../assets/photos/phone2.png";
import backIcon from "../assets/icons/image.png";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    phoneNumber: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const nameParts = formData.name.trim();
    const errors = {
      name: nameParts.length < 2,
      phoneNumber: !/^\d{9}$/.test(formData.phoneNumber),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      password: formData.password.trim() === "",
      confirmPassword: formData.password !== formData.confirmPassword,
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      const userData = {
        name: formData.name,
        phone: formData.phoneNumber,
        password_confirmation: formData.confirmPassword,
        email: formData.email,
        password: formData.password,
      };
      try {
        const response = await fetch(
          "https://47c3-77-28-131-181.ngrok-free.app/api/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        const data = await response.json();
        console.log(data);
        navigate("/myProfile", { state: { showPopup: true } });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <section className="registerSection">
      <nav>
        <Link to={"/"}>
          <img className="iconBack" src={backIcon} alt="back" />
          <FontAwesomeIcon className="leftIcon" icon={faChevronLeft} />
        </Link>
      </nav>
      <div className="test123">
        <div className="registerWrapper">
          <p className="headerRegister">Регистрирај се</p>
          <form
            onSubmit={handleSubmit}
            className="formRegister"
            action="/register"
            method="POST"
          >
            <TextField
              fullWidth
              id="name"
              label="Име и Презиме"
              variant="outlined"
              margin="normal"
              value={formData.name}
              onChange={handleInputChange}
              error={formErrors.name}
              helperText={
                formErrors.name ? "Мора да внесете и име и презиме" : ""
              }
              className="nameInput"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "30px" } }}
            />
            <TextField
              fullWidth
              id="phoneNumber"
              label="Телефон"
              type="text"
              variant="outlined"
              margin="normal"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={formErrors.phoneNumber}
              helperText={
                formErrors.phoneNumber
                  ? "Телефонскиот број мора да има точно 9 цифри"
                  : ""
              }
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "30px" } }}
            />
            <TextField
              fullWidth
              id="email"
              label="Е-маил"
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={handleInputChange}
              error={formErrors.email}
              helperText={formErrors.email ? "Невалиден е-маил" : ""}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "30px" } }}
            />
            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              error={formErrors.password}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "30px" } }}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {formErrors.password && (
                <FormHelperText>Полето е задолжително</FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              error={formErrors.confirmPassword}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "30px" } }}
            >
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              {formErrors.confirmPassword && (
                <FormHelperText>Лозинките мора да се совпаѓаат</FormHelperText>
              )}
            </FormControl>

            <Button
              onClick={() => navigate("/myProfile")}
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#1ea282",
                color: "white",
                width: "50%",
                "&:hover": {
                  backgroundColor: "#178a6d",
                },
              }}
            >
              Регистрирај се
            </Button>
          </form>
        </div>
        <div className="phoneImgWrapper">
          <img src={phoneImg} alt="phone" />
          <div className="shadow"></div>
        </div>
      </div>
    </section>
  );
}
