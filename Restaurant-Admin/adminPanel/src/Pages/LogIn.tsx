import { useEffect, useState } from "react";
import { useUserLoginContext } from "../context/UserLoginContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const { tokenData, setTokenData } = useUserLoginContext();
  const [nameUser, setNameUser] = useState("");
  const [wordPass, setWordPass] = useState("");
  const [showErr, setShowErr] = useState("Enter Credentials");

  const navigate = useNavigate();

  useEffect(() => {
    if (tokenData) navigate("/adminPanel");
  }, [navigate, tokenData]);

  const loginFunc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendCreds = {
      username: nameUser,
      password: wordPass,
    };

    try {
      if (nameUser && wordPass) {
        const response = await fetch(`http://localhost:5000/signIn`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": "86dg6qwd6g7878g0D68G97y9SF8Y9-sfgy8AD",
          },
          body: JSON.stringify(sendCreds),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setShowErr(data.message);
          localStorage.setItem("tokenUser", data.token);
          setTokenData(data.token);
          navigate("/adminPanel");
        } else {
          setShowErr(data.message || "Login failed");
        }
      }
    } catch (err) {
      console.error("Error during login:", err);
      setShowErr("An error occurred. Please try again.");
    }
  };

  return (
    <section className="loginSec">
      <h1>Restaurant Admin-Panel</h1>
      <h2 className="errShow">{showErr}</h2>
      <form className="loginForm" onSubmit={loginFunc}>
        <div>
          <label>Username: user123</label>
          <input
            type="text"
            value={nameUser}
            onChange={(e) => setNameUser(e.target.value.trim())}
            placeholder="Username"
          />
        </div>
        <div>
          <label>Password: pass123</label>
          <input
            type="password"
            value={wordPass}
            onChange={(e) => setWordPass(e.target.value.trim())}
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default LogIn;
