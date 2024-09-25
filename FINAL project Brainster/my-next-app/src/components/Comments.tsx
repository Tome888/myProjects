import { useAuthContext } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import AlertPopup from "@/microComponents/AlertPopup";
import CommentComp from "@/microComponents/CommentComp";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface CommentProps {
  id: string;
  name: string;
  lastName: string;
  comment: string;
  date: string;
  hour: string;
  blogId: string;
  likesCount: number;
}
interface arrCommProps {
  commArrFetch: CommentProps[];
}
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function Comments({ commArrFetch }: arrCommProps) {
  const [arrCom, setArrCom] = useState(commArrFetch);
  const [textComm, setTextComm] = useState("");
  const { userData, token, setUserData, setToken } = useAuthContext();
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
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
    fetch(`http://localhost:5001/api/commentsBlog?blogId=${router.query.id}`)
      .then((res) => res.json())
      .then((data) => setArrCom(data))
      .catch((err) => console.error(err, "error found"));
  }, [router]);

  const fetchNewComm = () => {
    fetch(`http://localhost:5001/api/commentsBlog?blogId=${router.query.id}`)
      .then((res) => res.json())
      .then((data) => setArrCom(data))
      .catch((err) => console.error(err, "error found"));
  };

  const addNewCommentFunc = (e: any) => {
    e.preventDefault();

    const theToken: any = token!;

    if (token && userData) {
      if (textComm.trim() !== "") {
        const userInfoLS = JSON.parse(localStorage.getItem("userData")!);

        fetch("http://localhost:5001/api/commentsBlog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${theToken.token}`,
          },
          body: JSON.stringify({
            name: userInfoLS.name,
            lastName: userInfoLS.lastName,
            comment: textComm.trim(),
            date: new Date().toLocaleDateString(),
            hour: new Date().toLocaleTimeString(),
            blogId: router.query.id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data, "comm added");
            setActiveType("Comment added successfully");

            setTextComm("");
            fetchNewComm();
          })
          .catch((err) => {
            console.error(err, "trouble adding comment");
          });
      }
    } else {
      setActiveType("Please log in or sign up to comment");
    }
  };

  return (
    <section>
      <AlertPopup
        color={"rgba(255,15,15, 0.7)"}
        text={"Please log in or sign up to comment"}
        activeClass={
          activType === "Please log in or sign up to comment"
            ? "alertActivated"
            : ""
        }
      />
      <AlertPopup
        color={"rgba(53,180,90, 0.7)"}
        text={"Comment added successfully"}
        activeClass={
          activType === "Comment added successfully" ? "alertActivated" : ""
        }
      />
      <div className="addComment">
        <img src="/grDots.png" alt="" className="dotGrComm" />
        <div className="orangeBorderComm">
          <div className="addCommPfpWrapper">
            <img src="/pfps/anon.png" alt="" className="commPfp addCommPfp" />
            <i className="fa-solid fa-paperclip"></i>
          </div>

          <form className="commentForm" onSubmit={(e) => addNewCommentFunc(e)}>
            <textarea
              name="comment"
              onChange={(event) => setTextComm(event.target.value)}
              value={textComm}
            ></textarea>
            <button type="submit" className="buttonAni">
              {translations.comm1}
            </button>
          </form>
        </div>
      </div>
      <div className="commentWrapper">
        <h2>{translations.comm}</h2>
        <div className="commentSection">
          <CommentComp
            imgPath={"/pfps/pfp1.jpg"}
            userName={"User 99"}
            textOfComment={null}
            numberOfComm={1}
            date={null}
            hour={null}
          />
          <div className="commentIndividualWrapper replyIndividual">
            <div className="divASDASD">
              <img src="/pfps/pfp2.jpg" alt="" className="commPfp" />
              <div>
                <p className="commUserName">User 2</p>
                <p>6:21:20 PM | 9/5/2024</p>
              </div>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              libero non magni dolore iure mollitia at fuga earum, incidunt aut
              harum, architecto consequatur quos cupiditate temporibus corrupti
              enim suscipit in eligendi vero laborum? Quod illo a quam, sed ad
              quia. Rerum libero aliquid totam iure nam id nihil dicta nemo!
            </div>
          </div>

          <div className="commentIndividualWrapper replyIndividual">
            <div className="divASDASD">
              <img src="/pfps/pfp3.jpg" alt="" className="commPfp" />
              <div>
                <p className="commUserName">User 3</p>
                <p>6:21:20 PM | 9/5/2024</p>
              </div>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              libero non magni dolore iure mollitia at fuga earum, incidunt aut
              harum, architecto consequatur quos cupiditate temporibus corrupti
              enim suscipit in eligendi vero laborum? Quod illo a quam, sed ad
              quia. Rerum libero aliquid totam iure nam id nihil dicta nemo!
            </div>
          </div>

          <CommentComp
            imgPath={"/pfps/pfp4.jpg"}
            userName={"User 10"}
            textOfComment={null}
            numberOfComm={null}
            date={null}
            hour={null}
          />

          {arrCom.map((comm, inx) => {
            return (
              <CommentComp
                key={comm.id}
                imgPath={null}
                userName={comm.name}
                textOfComment={comm.comment}
                numberOfComm={null}
                date={comm.date}
                hour={comm.hour}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Comments;
