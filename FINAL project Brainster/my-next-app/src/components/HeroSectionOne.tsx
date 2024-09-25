import SocialsGreen from "@/microComponents/SocialsGreen";

interface HeroSectionOneprops {
  img: string;
  smallTitle: string;
  title: string;
  smallTitleTwo: string;
}

function HeroSectionOne({
  img,
  smallTitle,
  title,
  smallTitleTwo,
}: HeroSectionOneprops) {
  return (
    <>
      <section className="blogArticleHeroSection">
        <img src="/grDots.png" alt="" className="dotGrComm" />
        <div
          className="wrapperBlogArticleHero"
          style={{ backgroundImage: `url(${img})` }}
        >
          <p style={{ color: "white" }}>{smallTitle}</p>
          <h2>{title}</h2>

          <p>|{smallTitleTwo}</p>
        </div>
        <SocialsGreen customClass="blogArticleSocialGreen" />
      </section>
    </>
  );
}

export default HeroSectionOne;
