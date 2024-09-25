
import HeroSectionTwo from "@/components/HeroSectionTwo";
import BreadCrumbs from "@/microComponents/BreadCrumbs";
import InfiniteCardScroll from "@/microComponents/InfiniteCardScroll";
import TeamCompCards from "@/microComponents/TeamCompCards";
import WhiteContainerText from "@/microComponents/WhiteContainerText";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useLanguage } from "@/context/LanguageContext";

export interface TeamComProp {
  id: string;
  name: string;
  position: string;
}

interface AboutProps {
  teamArr: TeamComProp[];
}
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};

const About: React.FC<AboutProps> = ({ teamArr }) => {
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  return (
    <>
      <Head>
        <title>MHRA</title>
        <meta name="description" content="About MHRA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSectionTwo
        img1="/genericPhotos/generic5.jpg"
        img2="/ourBlogImgs/firstImg.jpg"
      >
        <>
          <WhiteContainerText
            title={translations.meetTheTeam}
            text={translations.associationName}
          />
          <div className="secondLeftDivMain">
            <h5>{translations.joinUs}</h5>
            <button className="buttonAni">{translations.readMore1}</button>
          </div>
        </>
      </HeroSectionTwo>
      <InfiniteCardScroll />
      <BreadCrumbs />

      <section className="section100">
        <div className="left100 about100L">
          <img className="img101" src="/pfps/pfp2.jpg" alt="" />
          <div>
            <h2>{translations.goalsAndObjectives}</h2>
            <p>
              <span>{translations.supportTitle}</span>
              {translations.support}
            </p>
            <p>
              <span>{translations.recognitionTitle}</span>
              {translations.recognition}
            </p>
            <p>
              <span>{translations.aspirationTitle}</span>
              {translations.aspiration}
            </p>
          </div>
        </div>
        <div className="right100 about100R">
          <div className="slideFromRightDiv">
            <h2>{translations.missionAndVision}</h2>
            <h3>{translations.mahrHero}</h3>
            <p>{translations.machrInfoSMTH}</p>
            <p>
              <span>{translations.mission}</span>
              {translations.missionMCHR}
            </p>
            <p>
              <span>{translations.vision}</span>
              {translations.vissionMCHR}
            </p>
          </div>
          <img className="img102" src="/pfps/pfp3.jpg" alt="" />
        </div>
      </section>

      

      <section className="ceoSection">
        <img src="/pfps/pfp1.jpg" alt="" />
        <div>
          <h2>{translations.presidentOfMAHR}</h2>
          <h3>{translations.darcoPetrovski}</h3>
          <p>{translations.darcoBio1}</p>
          <p>{translations.darcoBio2}</p>
          <p>{translations.darcoBio3}</p>
          <p>{translations.darcoBio4}</p>
        </div>
      </section>

      <section className="teamCompSec">
        <h2>{translations.boardMACHR}</h2>

        <div className="cardsPersonWrapper">
          {teamArr &&
            teamArr.map((person) => {
              return (
                <TeamCompCards
                  name={person.name}
                  poss={person.position}
                  key={person.id}
                />
              );
            })}
        </div>
      </section>
    </>
  );
};

export default About;


export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:5001/api/teamComp");
  const data: TeamComProp[] = await res.json();

  return {
    props: {
      teamArr: data,
    },
  };
};

interface PersonProp {
  name: string;
  poss: string;
}

function LocalTeamCompCards({ name, poss }: PersonProp) {
  return (
    <div className="cardPerson">
      <img src="/pfps/anon.png" alt="" />
      <h3>{name}</h3>
      <p>{poss}</p>
    </div>
  );
}
