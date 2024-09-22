import { useNavigate } from "react-router-dom";
import { useUserLoginContext } from "../context/UserLoginContext";
import { useEffect } from "react";

function PageNotFound() {
  const { tokenData } = useUserLoginContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenData) {
      navigate("/");
    }
  }, [navigate, tokenData]);
  return <h2>PAGE NOT FOUND</h2>;
}

export default PageNotFound;
