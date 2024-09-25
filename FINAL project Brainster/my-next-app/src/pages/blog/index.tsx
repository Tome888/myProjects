import FilterBlog from "@/components/FilterBlog";
import HeroSectionTwo from "@/components/HeroSectionTwo";
import BreadCrumbs from "@/microComponents/BreadCrumbs";
import InfiniteCardScroll from "@/microComponents/InfiniteCardScroll";
import WhiteContainerText from "@/microComponents/WhiteContainerText";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useLanguage } from "@/context/LanguageContext";

interface BlogPageProps {
  blogs: any[];
}
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function Blog({ blogs }: BlogPageProps) {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const translations = translationsMap[language];
  return (
    <>
      <Head>
        <title>MHRA</title>
        <meta name="description" content="Blog MHRA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSectionTwo
        img1="/BlogCard/imgBlog1.jpg"
        img2="/BlogCard/imgBlog1.jpg"
      >
        <>
          <WhiteContainerText
            title={translations.someTitle}
            customClass="blogHeroWhiteWrapper"
            miniTitle={translations.miniTitle}
            text={translations.date}
          />
          <button
            className="buttonAni customBtnClass"
            onClick={() => router.push("/blog/1jsdc92n8c")}
          >
            {translations.readMore2}
          </button>
        </>
      </HeroSectionTwo>

      <InfiniteCardScroll />
      <BreadCrumbs />
      <section className="blogsSectionActive">
        <img src="/genericPhotos/generic10.jpg" alt="" />
        <div>
          <h3>{translations.activeSectionTitle}</h3>
          <p>{translations.activeSectionText}</p>
        </div>
      </section>

      <FilterBlog blogs={blogs} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:5001/api/blogs");
  const blogs: any[] = await res.json();

  return {
    props: {
      blogs,
    },
  };
};

export default Blog;
