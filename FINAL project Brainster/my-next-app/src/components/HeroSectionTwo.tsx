import SocialsGreen from "@/microComponents/SocialsGreen";

interface HeroTwoProps {
  children: React.ReactElement;
  img1: string;
  img2: string;
}

function HeroSectionTwo({ children, img1, img2 }: HeroTwoProps) {
  return (
    <section className="sectionTwo">
      <>
        <img src="/grDots.png" alt="" className="dotGrComm" />
        <div
          className="firstImgHero"
          style={{ backgroundImage: `url(${img1})` }}
        ></div>

        <div
          className="secondImgHero"
          style={{ backgroundImage: `url(${img2})` }}
        ></div>

        <div className="leftMain">{children}</div>
        <div className="rightMain">
          <SocialsGreen />
        </div>
      </>
    </section>
  );
}

export default HeroSectionTwo;
