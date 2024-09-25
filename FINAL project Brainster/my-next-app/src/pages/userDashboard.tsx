import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthContext } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import AlertPopup from "@/microComponents/AlertPopup";
import CustomCalendar from "@/microComponents/Calendar";
import CommentComp from "@/microComponents/CommentComp";
import InfiniteCardScroll, { Card } from "@/microComponents/InfiniteCardScroll";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import Head from "next/head";
import { useEffect, useState } from "react";

interface UserInfoProps {
  email: string;
  id: string;
  lastName: string;
  name: string;
  profession: string;
}
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function userDashboard() {
  const { userData, token, setUserData, setToken } = useAuthContext();
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  const [events, setEvents] = useState<Card[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [popup, setPopup] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [job, setJob] = useState("");

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
    fetch("http://localhost:5001/api/events")
      .then((res) => res.json())
      .then((data: Card[]) => setEvents(data));

    setUserInfo(JSON.parse(localStorage.getItem("userData")!));
  }, []);

  const changeInfoUser = (e: any) => {
    e.preventDefault();

    const theToken = JSON.parse(localStorage.getItem("TOKEN")!);

    if (name || email || password || job || lastName) {
      fetch("http://localhost:5001/api/userData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${theToken.token}`,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          profession: job,
          lastName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("sucess", data);
          setActiveType("Changes saved successfully");
          asdasd();
          setJob("");
          setPassword("");
          setEmail("");
          setLastName("");
          setName("");
        })
        .catch((err) => console.error(err, "from change info err"));
    }
  };

  const asdasd = () => {
    const dataForUser = JSON.parse(localStorage.getItem("userData")!);
    fetch(
      `http://localhost:5001/api/userData?id=${encodeURIComponent(
        dataForUser.id
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
        setUserInfo(data);
        console.log("data has been set");
      });
  };
  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>MHRA</title>
          <meta name="description" content="Dashboard MHRA" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="userDashFirstSec">
          <AlertPopup
            color={"rgba(53,180,90, 0.7)"}
            text={"Changes saved successfully"}
            activeClass={
              activType === "Changes saved successfully" ? "alertActivated" : ""
            }
          />
          <div
            className="settingsPopupBG"
            style={{ display: popup ? "flex" : "none" }}
          >
            <div className="settingsPopup">
              <div className="headerPopupSet">
                <h2>{translations.settings}</h2>
                <div onClick={() => setPopup(false)}>
                  <i className="fa-solid fa-x"></i>
                </div>
              </div>

              <div className="formsWrapperSett">
                <div className="leftFormSett">
                  <div className="wrapperInputSett">
                    <legend>{translations.nameProf}</legend>
                    <input
                      type="text"
                      placeholder={userInfo?.name}
                      onChange={(e) => setName(e.target.value.trim())}
                      value={name}
                    />
                  </div>

                  <div className="wrapperInputSett">
                    <legend>{translations.emailFooter}</legend>
                    <input
                      type="email"
                      placeholder={userInfo?.email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      value={email}
                    />
                  </div>

                  <div className="wrapperInputSett">
                    <legend>{translations.pass}</legend>
                    <input
                      type="password"
                      placeholder={translations.changePass}
                      onChange={(e) => setPassword(e.target.value.trim())}
                      value={password}
                    />
                  </div>

                  <div className="wrapperInputSett">
                    <legend>{translations.proff}</legend>
                    <input
                      type="text"
                      placeholder={userInfo?.profession}
                      onChange={(e) => setJob(e.target.value.trim())}
                      value={job}
                    />
                  </div>
                </div>
                <div className="rightFormSett">
                  <div className="wrapperInputSett">
                    <legend>{translations.lName}</legend>
                    <input
                      type="text"
                      placeholder={userInfo?.lastName}
                      onChange={(e) => setLastName(e.target.value.trim())}
                      value={lastName}
                    />
                  </div>

                  <form>
                    <fieldset>
                      <legend>{translations.notificationMethodsLegend}</legend>
                      <label>
                        <input
                          type="checkbox"
                          name="notificationMethods"
                          value="platform"
                        />
                        {translations.notificationMethodPlatform}
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="notificationMethods"
                          value="email"
                        />
                        {translations.notificationMethodEmail}
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="notificationMethods"
                          value="socialMedia"
                        />
                        {translations.notificationMethodSocialMedia}
                      </label>
                    </fieldset>
                  </form>

                  <form>
                    <fieldset>
                      <legend>{translations.notificationTypesLegend}</legend>
                      <label>
                        <input
                          type="checkbox"
                          name="notificationTypes"
                          value="newContent"
                        />
                        {translations.notificationTypeNewContent}
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="notificationTypes"
                          value="newEvents"
                        />
                        {translations.notificationTypeNewEvents}
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          name="notificationTypes"
                          value="eventReminder"
                        />
                        {translations.notificationTypeEventReminder}
                      </label>
                    </fieldset>
                  </form>
                </div>
              </div>
              <button
                className="buttonAni saveSettBtn"
                onClick={(e) => changeInfoUser(e)}
              >
                {translations.saveBtn}
              </button>
            </div>
          </div>

          <div className="leftWrapperDash">
            <img src="/pfps/anon.png" alt="" />
            <h2>
              {userInfo?.name} {userInfo?.lastName}
            </h2>
            <p>{translations.city}</p>

            <hr />
            <div className="iconsWrapperDash">
              <i className="fa-regular fa-user"></i>
              <p>{userInfo?.profession}</p>
            </div>
            <div className="iconsWrapperDash moreMargin">
              <i className="fa-solid fa-paperclip"></i>
              <p>{translations.cv}</p>
            </div>
            <div className="iconsWrapperDash">
              <i className="fa-solid fa-user-plus"></i>
              <p>+389 70 707 070</p>
            </div>
            <div className="iconsWrapperDash">
              <i className="fa-regular fa-envelope"></i>
              <p>{userInfo?.email}</p>
            </div>
            <div className="iconsWrapperDash" onClick={() => setPopup(true)}>
              <i className="fa-solid fa-gear"></i>
              <p>{translations.settings1}</p>
            </div>
          </div>
          <div className="rightWrapperDash">
            <div className="dashBiogrWrapper">
              <h2>{translations.shortBio}</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
                nam dignissimos quod eligendi? Quia temporibus libero
                perspiciatis, quisquam ipsam cum amet consequatur non dolorum
                sunt praesentium blanditiis doloremque dignissimos placeat earum
                cumque repellat ex neque maiores repellendus. Rerum qui
                voluptate voluptas et dignissimos, illo quos inventore
                repudiandae hic pariatur doloribus quas neque itaque quasi error
                deleniti eligendi. Velit omnis, reiciendis explicabo quo
                sapiente maiores numquam doloribus corporis sequi, ipsam
                recusandae, aperiam quae voluptatibus ipsa fugit in suscipit
                ullam. Aspernatur sed officiis illum fuga beatae quasi veritatis
                pariatur at optio ab dolorum, cumque libero magni accusantium
                mollitia ipsam tenetur inventore voluptate ullam saepe. Neque
                facere iusto fugit, autem quibusdam sequi cumque esse veritatis
                aperiam eligendi velit obcaecati reiciendis ab eveniet maiores
                eos ullam et asperiores praesentium necessitatibus ipsa
                perferendis? Dolores obcaecati, exercitationem aut ratione
                impedit fugit corrupti consectetur, nisi eveniet modi beatae non
                velit dolorum sit. Voluptas inventore iusto quia quam!
              </p>
              <div className="recomWrapper">
                <h2>{translations.recommendations}</h2>
                <CommentComp
                  imgPath={"/pfps/pfp1.jpg"}
                  userName={"User 99"}
                  textOfComment={null}
                  numberOfComm={null}
                  date={null}
                  hour={null}
                />
                <CommentComp
                  imgPath={"/pfps/pfp2.jpg"}
                  userName={"User 66"}
                  textOfComment={null}
                  numberOfComm={null}
                  date={null}
                  hour={null}
                />
                {showAll && (
                  <>
                    <CommentComp
                      imgPath={"/pfps/pfp3.jpg"}
                      userName={"User 669"}
                      textOfComment={null}
                      numberOfComm={null}
                      date={null}
                      hour={null}
                    />
                    <CommentComp
                      imgPath={"/pfps/pfp4.jpg"}
                      userName={"User 696"}
                      textOfComment={null}
                      numberOfComm={null}
                      date={null}
                      hour={null}
                    />
                  </>
                )}
                <p
                  style={{ color: `${showAll ? "#e87b22" : "gray"}` }}
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Затвори" : "Види ги сите"}
                </p>
              </div>
            </div>
          </div>
        </section>
        <InfiniteCardScroll />
        <section className="badgesSection">
          <div className="leftWrapperBadges">
            <div className="badgeWrapperDash">
              <h3>{translations.pointsFrame}</h3>
              <div className="badgeHolderDiv">
                <div>
                  <img src="/dashUserEl/Ellipse 92.png" alt="" />
                  <div className="fittyBadge one">50</div>
                </div>
                <div>
                  <img src="/dashUserEl/Ellipse 150.png" alt="" />
                  <div className="fittyBadge two">50</div>
                </div>
                <div>
                  <img src="/dashUserEl/Ellipse 151.png" alt="" />
                  <div className="fittyBadge three">50</div>
                </div>
              </div>
            </div>

            <div className="badgeWrapperDashSecond">
              <div className="headerSecondBadge">
                <h3>{translations.latestBadges}</h3>
                <p>{translations.viewAll1}</p>
              </div>
              <div className="holderOfBadgesSecond">
                <div className="badgeHolderSecond">
                  <i className="fa-regular fa-comment com"></i>
                  <p>{translations.badgeActivityLevel2}</p>
                </div>
                <div className="badgeHolderSecond">
                  <i className="fa-solid fa-calendar-days calDash"></i>
                  <p>{translations.badgeEventLevel3}</p>
                </div>
              </div>
            </div>

            <div className="contactsWrapper">
              <h3>{translations.connectionList}</h3>
              <form>
                <label>{translations.addConnection}</label>
                <input type="text" placeholder="Search" />
              </form>
              <div className="headerHolderThird">
                <h3>{translations.recentlyAdded}</h3>
                <p>{translations.viewAll1}</p>
              </div>
              <div className="friendsWrapperThird">
                <div className="profileCard">
                  <img src="/pfps/anon.png" alt="" />
                  <p>Anon1</p>
                </div>
                <div className="profileCard">
                  <img src="/pfps/anon.png" alt="" />
                  <p>Anon2</p>
                </div>
                <div className="profileCard">
                  <img src="/pfps/anon.png" alt="" />
                  <p>Anon3</p>
                </div>
                <div className="profileCard">
                  <img src="/pfps/anon.png" alt="" />
                  <p>Anon4</p>
                </div>
                <div className="profileCard">
                  <img src="/pfps/anon.png" alt="" />
                  <p>Anon5</p>
                </div>
                <div className="profileCard">
                  <img src="/pfps/anon.png" alt="" />
                  <p>Anon6</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rightWrapperBadges">
            <h2>{translations.purchasedTickets}</h2>
            <div className="containerBilet">
              <img src="/dashUserEl/bilet.png" alt="" />
              <div>
                <p className="firstTextBilet">
                  <b>{translations.heroTitle}: </b>
                  {translations.ticketText1}
                </p>
                <p className="secondTextBilet">{translations.ticketText2}</p>
              </div>
            </div>
            <div className="containerBilet">
              <img src="/dashUserEl/bilet.png" alt="" />
              <div>
                <p className="firstTextBilet">
                  <b>{translations.ticketText3}</b>
                </p>
                <p className="secondTextBilet">{translations.ticketText4}</p>
              </div>
            </div>
            <div className="percentageWrapper">
              <div>
                <h3>{translations.earnedDiscount}</h3>
                <p className="numberPerc">20%</p>
                <h3>{translations.nextTicketDiscount}</h3>
              </div>
              <div>
                <h3>{translations.recommendedTo}</h3>
                <p className="numberPerc">20</p>
                <h3>{translations.friends}</h3>
              </div>
            </div>
            <div className="orangeBorderComm userDashCommWrapper">
              <div className="addCommPfpWrapper userDashComm">
                <i className="fa-solid fa-paperclip"></i>
              </div>

              <form
                className="commentForm"
                onSubmit={(e) => e.preventDefault()}
              >
                <textarea
                  name="comment"
                  placeholder={translations.feedbackPlaceholder}
                ></textarea>
                <button type="submit" className="buttonAni">
                  {translations.sendButton}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="calendarSection">
          <div className="calendarSecTextWrapper">
            <h2>{translations.calendarTitle}</h2>
            <p>{translations.calendarDescription}</p>
          </div>
          <CustomCalendar arrEvents={events} />
        </section>
      </>
    </ProtectedRoute>
  );
}
export default userDashboard;
