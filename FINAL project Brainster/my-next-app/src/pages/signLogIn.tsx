import HeroSectionTwo from "@/components/HeroSectionTwo";
import { useAuthContext } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import AlertPopup from "@/microComponents/AlertPopup";
import WhiteContainerText from "@/microComponents/WhiteContainerText";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface UserProps {
  firstName: string;
  lastName: string;
  profession: string;
  getNotyOn: string;
  getNotyFor: string;
  email: string;
  pass: string;
  id: string;
}
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function signLogIn() {
  const { userData, token, setUserData, setToken } = useAuthContext();
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  const router = useRouter();

  const [state, setState] = useState("logIn");

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [activType, setActiveType] = useState("");
  useEffect(() => {
    if (activType) {
      const timer = setTimeout(() => {
        setActiveType("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [activType]);

  useEffect(() => {
    if (token && userData) {
      router.push("/userDashboard");
    }
  }, [token, userData]);

  const signUpFunction = (e: any) => {
    e.preventDefault();
    if (pass === rePass && name.trim() && email.trim() && lastName.trim()) {
      fetch("http://localhost:5001/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: pass,
          profession: job,
          lastName: lastName.trim(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setActiveType("User created successfully");
          setState("logIn");
          console.log(data);
        })
        .catch((err) => console.error(err, "from Sign up"));
    } else {
      setActiveType("Invalid Form Submition");
    }
  };

  const loginFunc = (e: any) => {
    e.preventDefault();
    if (loginEmail !== "" && loginPass !== "") {
      fetch("http://localhost:5001/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.token) {
            localStorage.setItem("TOKEN", JSON.stringify(data));
            getUserData(loginEmail);
            setToken(data);
          } else {
            setActiveType("User not found");
          }
        })
        .catch((err) => console.error(err, "from Login"));
    }
  };

  const getUserData = (email: any) => {
    fetch(
      `http://localhost:5001/api/userData?email=${encodeURIComponent(email)}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch user data: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("userData", JSON.stringify(data));

        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert(`Error fetching user data: ${error.message}`);
      });
  };

  return (
    <>
      <Head>
        <title>MHRA</title>
        <meta name="description" content="Sign In MHRA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSectionTwo
        img1={"/genericPhotos/generic2.jpg"}
        img2={"/genericPhotos/generic2.jpg"}
      >
        <>
          <WhiteContainerText title={translations.joinUs} />
          <button className="buttonAni">{translations.readMore}</button>
        </>
      </HeroSectionTwo>

      <section className="loginSection">
        <AlertPopup
          color={"rgba(255,15,15, 0.7)"}
          text={"Invalid Form Submition"}
          activeClass={
            activType === "Invalid Form Submition" ? "alertActivated" : ""
          }
        />
        <AlertPopup
          color={"rgba(255,15,15, 0.7)"}
          text={"User not found"}
          activeClass={activType === "User not found" ? "alertActivated" : ""}
        />
        <AlertPopup
          color={"rgba(53,180,90, 0.7)"}
          text={"User created successfully"}
          activeClass={
            activType === "User created successfully" ? "alertActivated" : ""
          }
        />
        <div className="logintextFirst">
          <p
            className={state === "logIn" ? "activeUnderline" : ""}
            onClick={() => setState("logIn")}
          >
            {translations.login}
          </p>
          {translations.or}
          <p
            className={state === "signUp" ? "activeUnderline" : ""}
            onClick={() => setState("signUp")}
          >
            {translations.signUp1}
          </p>
        </div>
        <div className="card">
          <div className={`cardBack ${state === "signUp" ? "flipped" : ""}`}>
            <form
              className="signUpForm"
              action="submit"
              onSubmit={(e) => signUpFunction(e)}
            >
              <input
                type="text"
                required
                placeholder="Name"
                onChange={(e) => setName(e.target.value.trim())}
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value.trim())}
              />
              <input
                type="email"
                required
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value.trim())}
              />
              <input
                type="text"
                required
                placeholder="Profession"
                onChange={(e) => setJob(e.target.value.trim())}
              />
              <input
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPass(e.target.value.trim())}
              />
              <input
                type="password"
                required
                placeholder="re-enter Password"
                onChange={(e) => setRePass(e.target.value.trim())}
              />

              <button className="buttonNoAni noAniTwo" type="submit">
                {translations.signUp1}
              </button>
            </form>
          </div>
          <div className={`cardFront ${state === "logIn" ? "" : "flipped"}`}>
            <div className="formContainer">
              <div className="loginWithGoogle">{translations.goog}</div>
              <div className="orlogin">
                <hr />
                <p>{translations.or}</p>
                <hr />
              </div>
              <form className="formOne" onSubmit={(e) => loginFunc(e)}>
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="mhra@primer.com"
                  onChange={(e) => setLoginEmail(e.target.value.trim())}
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setLoginPass(e.target.value.trim())}
                />

                <button className="buttonNoAni" type="submit">
                  {translations.conWmail}
                </button>
              </form>
            </div>
            <div className="termsDiv">
              <p>{translations.terms}</p>

              <div>
                <input type="checkbox" />
                <label>{translations.memberMchr}</label>
              </div>

              <div>
                <input type="checkbox" />
                <label>{translations.notys}</label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lastSecLogin">
        <div className="leftWrapperLogin">
          <div>
            <img
              className="leftImgLogin"
              src="/genericPhotos/generic6.jpg"
              alt=""
            />
          </div>
          <div className="lastTextDiv">
            <h2>{translations.corporateMembershipBenefits}</h2>
            <ul>
              <li>{translations.corporateBenefit1}</li>
              <li>{translations.corporateBenefit2}</li>
              <li>{translations.corporateBenefit3}</li>
              <li>{translations.corporateBenefit4}</li>
              <li>{translations.corporateBenefit5}</li>
            </ul>
          </div>
        </div>
        <div className="rightWrapperLogin">
          <div className="lastTextDiv">
            <h2>{translations.individualMembershipBenefits}</h2>
            <ul>
              <li>{translations.individualBenefit1}</li>
              <li>{translations.individualBenefit2}</li>
              <li>{translations.individualBenefit3}</li>
              <li>{translations.individualBenefit4}</li>
              <li>{translations.individualBenefit5}</li>
            </ul>
          </div>

          <div>
            <img
              className="rightImgLogin"
              src="/genericPhotos/generic7.jpg"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default signLogIn;
