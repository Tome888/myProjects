import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function BreadCrumbs() {
  const router = useRouter();
  const [breadPath, setBreadpath] = useState<any[]>([]);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const thePath = router.asPath.split("/");
    setBreadpath(thePath);
  }, [router]);

  const makebreadCrumb = (arrPaths: any[]) => {
    const arrTranslatedPaths: any = [];
    const arrTranslatedPathsEN: any = [];

    arrPaths.forEach((path, inx) => {
      if (path === "") {
        arrTranslatedPaths.push("Почетна");
        arrTranslatedPathsEN.push("Home");
      }

      if (path === "events") {
        arrTranslatedPaths.push("Настан");
        arrTranslatedPathsEN.push("Event");
      }
      if (path === "blog") {
        arrTranslatedPaths.push("Блогови");
        arrTranslatedPathsEN.push("Blogs");
      }
      if (path === "yearlyConference") {
        arrTranslatedPaths.push("Годишна конференција");
        arrTranslatedPathsEN.push("Yearly Conference");
      }
      if (path === "about") {
        arrTranslatedPaths.push("За нас");
        arrTranslatedPathsEN.push("About us");
      }

      if (inx === 2) {
        const toNum = +path;
        arrTranslatedPaths.push(
          isNaN(toNum) ? "Блог Пост" : "Информации за настан"
        );
        arrTranslatedPathsEN.push(isNaN(toNum) ? "Blog Post" : "Event Info");
      }
    });

    return (
      <div className="breadCumbsWrapper">
        {language === "mk"
          ? arrTranslatedPaths.map((pathItem: any, inx: any) => {
              return (
                <p key={inx} onClick={() => router.push(`/${breadPath[inx]}`)}>
                  <i
                    className="fa-solid fa-chevron-right"
                    style={{
                      display: pathItem === "Почетна" ? "none" : "block",
                    }}
                  ></i>
                  {pathItem}
                </p>
              );
            })
          : arrTranslatedPathsEN.map((pathItem: any, inx: any) => {
              return (
                <p key={inx} onClick={() => router.push(`/${breadPath[inx]}`)}>
                  <i
                    className="fa-solid fa-chevron-right"
                    style={{
                      display: pathItem === "Почетна" ? "none" : "block",
                    }}
                  ></i>
                  {pathItem}
                </p>
              );
            })}
      </div>
    );
  };
  return makebreadCrumb(breadPath);
}

export default BreadCrumbs;
