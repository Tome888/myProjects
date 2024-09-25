import { useLanguage } from "@/context/LanguageContext";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useRouter } from "next/router";
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function OurBlogSec() {
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  const router = useRouter();
  return (
    <section className="ourBlogSec">
      <img src="/grDots.png" alt="" className="dotGrComm" />
      <div className="firstDivOurBlog">
        <div
          className="leftFirstImgOurBlog"
          style={{ backgroundImage: `url(/ourBlogImgs/firstImg.jpg)` }}
        ></div>
        <div className="ourBlogDiv">
          <p>{translations.headNowTo}</p>
          <button className="buttonAni" onClick={() => router.push("/blog")}>
            {translations.ourBlogBtn}
          </button>
        </div>
        <div
          className="leftSecondImgOurBlog"
          style={{ backgroundImage: `url(/ourBlogImgs/secondImg.jpg)` }}
        ></div>
      </div>
      <div className="secondDivOurBlog">
        <div className="rightFirstDivOurBlog">
          <h2>{translations.shareOpinions}</h2>
          <p>{translations.exchangeOpinions}</p>
        </div>
        <div
          className="rightSecondDivOurBlog"
          style={{ backgroundImage: `url(/ourBlogImgs/thirdImg.jpg)` }}
        ></div>
      </div>
    </section>
  );
}

export default OurBlogSec;
