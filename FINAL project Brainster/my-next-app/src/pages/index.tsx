import Head from "next/head";
import Hero from "@/components/Hero";
import InfiniteCardScroll from "@/microComponents/InfiniteCardScroll";
import OurBlogSec from "@/components/OurBlogSec";
import FourCardsSection from "@/components/FourCardsSection";
import BenifitLi from "@/microComponents/BenifitLi";
import BuyTicket from "@/microComponents/BuyTicket";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/router";

export interface CardProps {
  id: any;
  title: string;
  text: string;
  img: string;
  category: string;
}
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};

export default function Home() {
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  const router = useRouter();
  return (
    <>
      <Head>
        <title>MHRA</title>
        <meta name="description" content="Homepage MHRA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <InfiniteCardScroll />
      <OurBlogSec />

      <section className="benifitsSec">
        <div className="leftDivBenf">
          <BenifitLi num={"01"} title={translations.educationalContent} />
          <BenifitLi num={"02"} title={translations.latestInfo} />
          <BenifitLi num={"03"} title={translations.networkBuilding} />
          <BenifitLi num={"04"} title={translations.involvementInMachr} />
          <BenifitLi num={"05"} title={translations.hrJobAds} />
        </div>
        <div className="rightDivBenf">
          <h2>{translations.membershipBenefits}</h2>
          <p>{translations.aboutMachr}</p>
        </div>
      </section>

      <section>
        <h2>{translations.currentEvents}</h2>
        <FourCardsSection typeCards={"events"} />
      </section>
      <section>
        <section className="ConfFirst">
          <div className="leftConfFirst">
            <h2 className="heading1000">
              {translations.annualConferenceDescription}
            </h2>

            <p>{translations.internationalExchange}</p>
          </div>
          <div className="rightConfFirst">
            <img
              className="bigPicConf backupClassThree"
              src="/genericPhotos/generic3.jpg"
              alt=""
            />
            <div className="bubbleConfDiv firstBubble backupClassTwo">
              <BuyTicket />
            </div>
            <div className="bubbleConfDiv secondBubble">
              <img src="/genericPhotos/generic6.jpg" alt="" />
            </div>
          </div>
        </section>
        <h2>{translations.popularResearches}</h2>
        <FourCardsSection typeCards={"blogs"} />
      </section>
      <section className="section100">
        <img src="/grDots.png" alt="" className="dotGrComm" />
        <div className="left100">
          <img className="img101" src="/pfps/pfp2.jpg" alt="" />
          <div className="cloudGray">{translations.stayUpdated}</div>
          <h2>{translations.learnMoreAboutUs}</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
            inventore cum adipisci pariatur amet fuga! adipisicing elit. Quod
            inventore cum adipisci pariatur amet fuga!
          </p>
          <button
            className="buttonAni button100"
            onClick={() => router.push("/about")}
          >
            {translations.readMoreAboutUsButton}
          </button>
        </div>
        <div className="right100">
          <img className="img102" src="/pfps/pfp3.jpg" alt="" />
          <div className="cloudOrange">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, ut
            quibusdam dignissimos officia quia commodi recusandae! Dignissimos,
            iusto! Laboriosam soluta assumenda amet voluptates sapiente
            similique! Veniam placeat possimus ea soluta!
          </div>
        </div>
      </section>
    </>
  );
}
