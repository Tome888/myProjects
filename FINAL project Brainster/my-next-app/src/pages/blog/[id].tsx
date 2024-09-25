import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BlogCardProps } from "@/microComponents/BlogCard";
import SocialsGreen from "@/microComponents/SocialsGreen";
import InfiniteCardScroll from "@/microComponents/InfiniteCardScroll";
import HeroSectionOne from "@/components/HeroSectionOne";
import Comments from "@/components/Comments";
import FourCardsSection from "@/components/FourCardsSection";
import BreadCrumbs from "@/microComponents/BreadCrumbs";
import Head from "next/head";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useLanguage } from "@/context/LanguageContext";
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function BlogArticle() {
  const [blog, setBlog] = useState<BlogCardProps | null>(null);
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const [heart, setHeart] = useState(0);
  const [hearted, setHearted] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  const router = useRouter();

  const [fetchedComm, setFetchedComm] = useState([]);

  useEffect(() => {
    if (!router.query.id) return;

    const likeNumber = Math.floor(Math.random() * 350);
    setLike(likeNumber);
    const heartNumber = Math.floor(Math.random() * 350);
    setHeart(heartNumber);
    fetch(`http://localhost:5001/api/blogs?id=${router.query.id}`)
      .then((res) => res.json())
      .then((data: BlogCardProps[]) => {
        if (data.length > 0) {
          setBlog(data[0]);
        } else {
          setBlog(null);
        }
      })
      .catch((error) => {
        setBlog(null);
        console.error(error);
      });

    fetch(`http://localhost:5001/api/commentsBlog?blogId=${router.query.id}`)
      .then((res) => res.json())
      .then((data) => setFetchedComm(data))
      .catch((err) => console.error(err, "error found"));
  }, [router.query.id]);

  const handleLikeClick = () => {
    if (!hearted) {
      setLike((like) => (liked ? like - 1 : like + 1));
      setLiked((prevLiked) => !prevLiked);
    }
  };

  const handleHeartClick = () => {
    if (!liked) {
      setHeart((heart) => (hearted ? heart - 1 : heart + 1));
      setHearted((prevHearted) => !prevHearted);
    }
  };
  return (
    blog && (
      <>
        <Head>
          <title>MHRA</title>
          <meta name="description" content="Blog MHRA" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HeroSectionOne
          img={`/BlogCard/${blog.img}`}
          smallTitle={translations.blog}
          title={blog.title}
          smallTitleTwo={translations.date}
        />
        <InfiniteCardScroll />
        <BreadCrumbs />

        <section className="textWrapperBlogArticle">
          <div className="blogArticle200">
            <h2>{blog.title}</h2>
            <p>{blog.text}</p>
          </div>
          <img
            className="pfpUserBlogArticle"
            src={`/pfps/pfp${Math.floor(Math.random() * 4) + 1}.jpg`}
            alt="Profile Picture"
          />
        </section>
        <section className="blogMultiTextSec">
          <div className="wrapper99">
            <div className="left99">
              <div className="wrapperLeft">
                <h2>Blog Sample Text 1</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Accusamus esse earum similique facere cumque nisi accusantium
                  corrupti. Harum ipsam voluptatibus quaerat iusto debitis error
                  sapiente, aliquam deserunt nemo, eligendi quos!
                </p>
              </div>
              <div className="wrapperLeft">
                <h2>Blog Sample Text 2</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Accusamus esse earum similique facere cumque nisi accusantium
                  corrupti. Harum ipsam voluptatibus quaerat iusto debitis error
                  sapiente, aliquam deserunt nemo, eligendi quos!
                </p>
              </div>
              <div className="wrapperLeft">
                <h2>Blog Sample Text 3</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Accusamus esse earum similique facere cumque nisi accusantium
                  corrupti. Harum ipsam voluptatibus quaerat iusto debitis error
                  sapiente, aliquam deserunt nemo, eligendi quos!
                </p>
              </div>
              <div className="wrapperLeft">
                <h2>Blog Sample Text 4</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Accusamus esse earum similique facere cumque nisi accusantium
                  corrupti. Harum ipsam voluptatibus quaerat iusto debitis error
                  sapiente, aliquam deserunt nemo, eligendi quos!
                </p>
              </div>
            </div>
            <div className="right99">
              <h4>{translations.gjokoName}</h4>
              <div className="faOrangeContainer smallOrange">
                <p className="shareWithAll">{translations.shareWCol}</p>
                <div>
                  <i className="fa-brands fa-square-facebook"></i>
                  <i className="fa-brands fa-square-x-twitter"></i>
                  <i className="fa-brands fa-linkedin"></i>
                </div>
              </div>
              <h4 className="shortDesc">{translations.shortBrief}</h4>
              <p>Blog Sample Text 1</p>
              <p>Blog Sample Text 2</p>
              <p>Blog Sample Text 3</p>
              <p>Blog Sample Text 4</p>
            </div>
          </div>
          <div className="interactionsBlogWrapper">
            <div onClick={handleLikeClick}>
              <i
                className={`fa-${liked ? "solid" : "regular"} fa-thumbs-up`}
              ></i>
              {like}
            </div>
            <div onClick={handleHeartClick}>
              <i className={`fa-${hearted ? "solid" : "regular"} fa-heart`}></i>
              {heart}
            </div>
            <div>
              <i className="fa-regular fa-comment"></i>
              365
            </div>
          </div>
          <div className="orangeShare1">
            <p style={{ color: "white" }}>{translations.likeTheBlogQ}</p>
            <div className="faOrangeContainer">
              <i className="fa-brands fa-square-facebook"></i>
              <i className="fa-brands fa-square-x-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
            </div>
          </div>
        </section>

        <Comments commArrFetch={fetchedComm} />
        <section>
          <h2>{translations.similarBlogs}</h2>
          <FourCardsSection typeCards={"blogs"} />
        </section>
      </>
    )
  );
}

export default BlogArticle;
